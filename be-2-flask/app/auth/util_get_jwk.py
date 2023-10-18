import requests
from typing import TypedDict
from app.config import COGNITO_CLIENT_REGION, COGNITO_POOL_ID


class JsonWebKey(TypedDict):
    alg: str
    e: str
    kid: str
    kty: str
    n: str
    use: str


JWKS = list[JsonWebKey]


def cognito_issuer():
    return f"https://cognito-idp.{COGNITO_CLIENT_REGION}.amazonaws.com/{COGNITO_POOL_ID}"


def query_keys() -> JWKS:
    url = f"{cognito_issuer()}/.well-known/jwks.json"
    print("...COGNITO --> getPublicKeys")
    response = requests.get(url)
    return response.json()["keys"]


cognito_jwks: JWKS = None


def cognito_keys():
    global cognito_jwks
    if cognito_jwks == None:
        cognito_jwks = query_keys()
    return cognito_jwks
