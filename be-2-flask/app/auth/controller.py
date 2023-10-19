from .service import get_tokens
from flask_openapi3 import OpenAPI
from .types import Tokens, GetTokensDto


def auth_routes(app: OpenAPI):
    @app.get("/auth/get-tokens", responses={200: Tokens})
    async def req_auth_tokens_get(query: GetTokensDto):
        try:
            return await get_tokens(query.dict())
        except Exception as e:
            print("...Error:", e)
            return {"error": "cognito/token error"}, 400

    @app.post("/auth/get-tokens", responses={200: Tokens})
    async def req_auth_tokens_post(body: GetTokensDto):
        try:
            return await get_tokens(body.dict())
        except Exception as e:
            print("...Error:", e)
            return {"error": "cognito/token error"}, 400
