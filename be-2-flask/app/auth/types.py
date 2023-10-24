from pydantic import BaseModel
from typing import TypedDict


class UserIdentity(TypedDict):
    sub: str
    userName: str
    clientId: str


class GetTokensDto(BaseModel):
    code: str
    redirectUri: str


class Tokens(BaseModel):
    accessToken: str
    refreshToken: str
    idToken: str
