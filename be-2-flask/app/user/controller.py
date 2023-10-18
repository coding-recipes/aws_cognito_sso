from flask import Flask
from app.auth import auth_guard, UserIdentity


def user_routes(app: Flask):
    @app.route("/user")
    @auth_guard
    def get_user_req(user: UserIdentity):
        return {
            "identity": user,
            "data": {},
        }
