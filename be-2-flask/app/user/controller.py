from flask import Flask
from flask_openapi3 import OpenAPI
from app.auth import auth_guard, UserIdentity
from .types import UserData


def user_routes(app: OpenAPI):
    @app.get("/user", responses={200: UserData})
    @auth_guard
    def get_user_req(user: UserIdentity):
        return {
            "identity": user,
            "data": {},
        }
