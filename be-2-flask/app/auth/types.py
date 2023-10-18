from typing import TypedDict


class GetTokensDto(TypedDict):
    code: str
    redirectUri: str


class Tokens(TypedDict):
    accessToken: str
    refreshToken: str
    idToken: str


class UserIdentity(TypedDict):
    sub: str
    userName: str
    clientId: str
