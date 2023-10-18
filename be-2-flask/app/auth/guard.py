from functools import wraps
from flask import make_response, Response
from .util_api_tokens import get_request_tokes, set_response_tokens
from .util_handle_tokens import handle_tokens, HandleTokensResult


def auth_guard(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        # ----- extract token -----
        access_token, refresh_token = get_request_tokes()
        # ----- verify token -----
        handle_result: HandleTokensResult = handle_tokens(access_token, refresh_token)
        if not handle_result["is_valid"]:
            return {"error": handle_result["error"]}, 401

        # ----- execute function -----
        response: Response = f(*args, **kwargs)
        # ----- add headers -----
        if not isinstance(response, Response):
            response = make_response(response)
        response.headers = set_response_tokens(response.headers, handle_result["access_token"])
        return response

    return decorator
