from typing import TypedDict
import requests
import base64
from config import (
    COGNITO_CLIENT_DOMAIN,
    COGNITO_CLIENT_ID,
    COGNITO_CLIENT_REGION,
    COGNITO_CLIENT_SECRET,
)


class GetTokensResponse(TypedDict):
    access_token: str
    id_token: str
    refresh_token: str
    token_type: str
    expires_in: int


async def get_tokens_util(code, redirect_uri) -> GetTokensResponse:
    url = f"https://{COGNITO_CLIENT_DOMAIN}.auth.{COGNITO_CLIENT_REGION}.amazoncognito.com/oauth2/token"
    client_id = COGNITO_CLIENT_ID
    client_secret = COGNITO_CLIENT_SECRET
    grant_type = "authorization_code"
    params = {"grant_type": grant_type, "client_id": client_id, "code": code, "redirect_uri": redirect_uri}

    authorization = "Basic " + base64.b64encode(f"{client_id}:{client_secret}".encode("utf-8")).decode("utf-8")

    headers = {"Content-Type": "application/x-www-form-urlencoded", "Authorization": authorization}

    print("...COGNITO --> getTokens")

    try:
        response = requests.post(url, data=params, headers=headers)
        response_data: GetTokensResponse = response.json()
        return response_data
    except Exception as e:
        raise Exception("COGNITO REQ ERROR")
