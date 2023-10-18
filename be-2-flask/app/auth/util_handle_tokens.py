from typing import TypedDict
from .types import UserIdentity
from .util_verify_token import verify_access_token, VerifyAccessTokenResult
from .util_refresh_token import refresh_access_token, RefreshAccessTokenResult


class HandleTokensResult(TypedDict):
    is_valid: bool
    error: str | None
    identity: UserIdentity | None
    access_token: str | None


def create_identity(verify_result: VerifyAccessTokenResult) -> UserIdentity:
    return {
        "user_id": verify_result["sub"],
        "user_name": verify_result["user_name"],
        "client_id": verify_result["client_id"],
    }


def handle_tokens(access_token: str | None, refresh_token: str | None) -> HandleTokensResult:
    try:
        if access_token == None:
            raise Exception("No access token provided")
        verif_result: VerifyAccessTokenResult = verify_access_token(access_token)

        if verif_result["is_valid"]:
            return {
                "is_valid": True,
                "error": None,
                "identity": create_identity(verif_result),
                "access_token": access_token,
            }

        if refresh_token == None:
            raise Exception("No refresh token provided")

        refresh_result: RefreshAccessTokenResult = refresh_access_token(refresh_token)
        access_token_new = refresh_result["access_token"]
        verif_result_new: VerifyAccessTokenResult = verify_access_token(access_token_new)

        if verif_result_new["is_valid"]:
            return {
                "is_valid": True,
                "error": None,
                "identity": create_identity(verif_result_new),
                "access_token": access_token_new,
            }

        raise Exception("Refreshing access token is failed")

    except Exception as e:
        return {"is_valid": False, "error": str(e), "identity": None, "access_token": None}
