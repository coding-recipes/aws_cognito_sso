from typing import TypedDict


class GetTokensDto(TypedDict):
    code: str
    redirectUri: str


class Tokens(TypedDict):
    accessToken: str
    refreshToken: str
    idToken: str


class UserIdentity(TypedDict):
    user_id: str
    user_name: str
    client_id: str
