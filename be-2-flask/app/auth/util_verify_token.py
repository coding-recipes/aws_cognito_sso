import requests

import jwt
import base64
import json
import time
from typing import TypedDict
from jose import jwk, jwt
from jose.utils import base64url_decode
from app.config import COGNITO_CLIENT_REGION, COGNITO_POOL_ID


class VerifyAccessTokenResult(TypedDict):
    sub: str
    userName: str
    clientId: str
    isValid: bool
    error: str


class TokenHeader(TypedDict):
    kid: str
    alg: str


class JWK(TypedDict):
    alg: str
    e: str
    kid: str
    kty: str
    n: str
    use: str


JWKS = list[JWK]


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


def cognito_issuer():
    return f"https://cognito-idp.{COGNITO_CLIENT_REGION}.amazonaws.com/{COGNITO_POOL_ID}"


cached_keys: JWKS = None


def get_keys() -> JWKS:
    global cached_keys
    if not cached_keys:
        url = f"{cognito_issuer()}/.well-known/jwks.json"
        print("...COGNITO --> getPublicKeys")
        response = requests.get(url)
        cached_keys = response.json()["keys"]
    return cached_keys


def verify_access_token(token) -> VerifyAccessTokenResult:
    try:
        print(f"...checking {token[:8]}...")
        token_sections = (token or "").split(".")
        if len(token_sections) < 2:
            raise Exception("requested token is invalid")

        header_json = base64.urlsafe_b64decode(token_sections[0] + "===").decode("utf-8")
        header: TokenHeader = json.loads(header_json)
        kid: str = header["kid"]

        keys: JWKS = get_keys()
        key_index = -1
        for i in range(len(keys)):
            if kid == keys[i]["kid"]:
                key_index = i
                break
        key: JWK = keys[key_index]
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

        exp_sec = int((claim["exp"] * 1000 - time.time()) / 1000)
        print(f"...confirmed - {claim['username']} - {claim['sub']} - {exp_sec}sec")

        return {"userName": claim["username"], "sub": claim["sub"], "clientId": claim["client_id"], "isValid": True}
    except Exception as error:
        return {"userName": "", "sub": "", "clientId": "", "error": str(error), "isValid": False}
