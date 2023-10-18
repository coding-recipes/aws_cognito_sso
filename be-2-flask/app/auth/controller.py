from flask import Flask, request, make_response
from .types import Tokens, GetTokensDto
from .service import get_tokens


def auth_routes(app: Flask):
    @app.route("/auth/get-tokens", methods=["GET", "POST"])
    async def get_tokens_req():
        getTokensDto: GetTokensDto = {}

        if request.method == "GET":
            getTokensDto = {"code": request.args.get("code"), "redirectUri": request.args.get("redirectUri")}

        if request.method == "POST":
            getTokensDto = request.json

        print(getTokensDto)

        try:
            return await get_tokens(getTokensDto)
        except Exception as e:
            print("...Error:", e)
            return make_response({"error": "cognito/token error"}, 400)
