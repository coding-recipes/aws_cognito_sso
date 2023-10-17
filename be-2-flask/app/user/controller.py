from flask import Flask


def user_routes(app: Flask):
    @app.route("/user")
    def get_user():
        return {
            "identity": {
                "sub": "1234567890",
                "userName": "John Doe",
                "clientID": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            },
            "data": {},
        }
