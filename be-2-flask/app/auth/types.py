from pydantic import BaseModel
from typing import TypedDict


class UserIdentity(TypedDict):
    user_id: str
    user_name: str
    client_id: str


class GetTokensDto(BaseModel):
    code: str
    redirectUri: str


class Tokens(BaseModel):
    accessToken: str
    refreshToken: str
    idToken: str
