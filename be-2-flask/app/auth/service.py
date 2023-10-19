from .types import Tokens, GetTokensDto
from .util_get_tokens import get_tokens_util, GetTokensResponse


async def get_tokens(data: GetTokensDto) -> Tokens:
    cognito_resonse: GetTokensResponse = await get_tokens_util(data.code, data.redirectUri)

    tokens = Tokens(
        accessToken=cognito_resonse["access_token"],
        refreshToken=cognito_resonse["refresh_token"],
        idToken=cognito_resonse["id_token"],
    )

    return tokens
