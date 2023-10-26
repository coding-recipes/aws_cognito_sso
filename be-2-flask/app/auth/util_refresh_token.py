from typing import TypedDict
import requests
from base64 import b64encode
from config import (
    COGNITO_CLIENT_DOMAIN,
    COGNITO_CLIENT_ID,
    COGNITO_CLIENT_REGION,
    COGNITO_CLIENT_SECRET,
)


class RefreshAccessTokenResult(TypedDict):
    access_token: str
    id_token: str
    token_type: str
    expires_in: str


def refresh_access_token(refresh_token: str) -> RefreshAccessTokenResult:
    url = f"https://{COGNITO_CLIENT_DOMAIN}.auth.{COGNITO_CLIENT_REGION}.amazoncognito.com/oauth2/token"
    grant_type = "refresh_token"
    data = {"grant_type": grant_type, "client_id": COGNITO_CLIENT_ID, "refresh_token": refresh_token}

    client_credentials = f"{COGNITO_CLIENT_ID}:{COGNITO_CLIENT_SECRET}"
    authorization = "Basic " + b64encode(client_credentials.encode()).decode("utf-8")

    headers = {"Content-Type": "application/x-www-form-urlencoded", "Authorization": authorization}

    print("...COGNITO --> refreshAccessToken")
    response = requests.post(url, data=data, headers=headers)
    response_data: RefreshAccessTokenResult = response.json()
    return response_data
