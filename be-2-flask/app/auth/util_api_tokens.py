from flask import request


def get_request_tokes() -> (str, str):
    """
    return (access_token, refresh_token)
    """
    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        auth_header = auth_header[7:]
    access_token = auth_header or request.headers.get("x-access-token")
    refresh_token = request.headers.get("x-refresh-token")
    return access_token, refresh_token


def set_response_tokens(headers, access_token: str = None, refresh_token: str = None):
    if access_token != None:
        headers["x-access-token"] = access_token
    if refresh_token != None:
        headers["x-refresh-token"] = refresh_token
    return headers
