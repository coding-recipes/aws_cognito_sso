from functools import wraps
from flask import request, make_response, Response
from .util_api_tokens import get_request_tokes, set_response_tokens
from .util_handle_tokens import handle_tokens, HandleTokensResult
from .types import UserIdentity


def auth_guard(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        # ----- extract token -----
        access_token, refresh_token = get_request_tokes()
        # ----- verify token -----
        handle_result: HandleTokensResult = handle_tokens(access_token, refresh_token)
        if handle_result["is_valid"] == False:
            return {"error": handle_result["error"]}, 401

        # ----- set user indentity -----
        identity: UserIdentity = handle_result["identity"]

        # ----- execute function -----
        response: Response = f(identity, *args, **kwargs)
        # ----- add headers -----
        if not isinstance(response, Response):
            response = make_response(response)
        response.headers = set_response_tokens(response.headers, handle_result["access_token"])
        return response

    return decorator
