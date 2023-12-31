import base64
import json
import time
from typing import TypedDict
from jose import jwk, jwt
from jose.utils import base64url_decode

from .util_get_jwk import cognito_issuer, cognito_keys, JsonWebKey, JWKS
from .types import UserIdentity


class VerifyAccessTokenResult(TypedDict):
    sub: str
    user_name: str
    client_id: str
    is_valid: bool
    error: str


class TokenHeader(TypedDict):
    kid: str
    alg: str


class Claim(TypedDict):
    sub: str
    iss: str
    version: str
    client_id: str
    origin_jti: str
    token_use: str
    scope: str
    auth_time: str
    exp: str
    iat: str
    jti: str
    username: str


def create_identity(verify_result: VerifyAccessTokenResult) -> UserIdentity:
    return {
        "sub": verify_result["sub"],
        "userName": verify_result["user_name"],
        "clientId": verify_result["client_id"],
    }


def verify_access_token(token) -> VerifyAccessTokenResult:
    try:
        print(f"...checking {token[:8]}...")
        token_sections = (token or "").split(".")
        if len(token_sections) < 2:
            raise Exception("requested token is invalid")

        header_json = base64.urlsafe_b64decode(token_sections[0] + "===").decode("utf-8")
        header: TokenHeader = json.loads(header_json)
        kid: str = header["kid"]

        keys: JWKS = cognito_keys()
        key_index = -1
        for i in range(len(keys)):
            if kid == keys[i]["kid"]:
                key_index = i
                break
        key: JsonWebKey = keys[key_index]
        public_key = jwk.construct(key)
        message, encoded_signature = str(token).rsplit(".", 1)
        # decode the signature
        decoded_signature = base64url_decode(encoded_signature.encode("utf-8"))
        # verify the signature
        if not public_key.verify(message.encode("utf8"), decoded_signature):
            raise Exception("signature verification failed")

        claim: Claim = jwt.get_unverified_claims(token)

        current_seconds = int(time.time())
        if current_seconds > claim["exp"] or current_seconds < claim["auth_time"]:
            raise Exception("claim is expired or invalid")
        if claim["iss"] != cognito_issuer():
            raise Exception("claim issuer is invalid")
        if claim["token_use"] != "access":
            raise Exception("claim use is not access")

        exp_sec = int(claim["exp"] - time.time())
        print(f"...confirmed - {claim['username']} - {claim['sub']} - {exp_sec}sec")

        return {"user_name": claim["username"], "sub": claim["sub"], "client_id": claim["client_id"], "is_valid": True}
    except Exception as error:
        return {"user_name": "", "sub": "", "client_id": "", "error": str(error), "is_valid": False}
