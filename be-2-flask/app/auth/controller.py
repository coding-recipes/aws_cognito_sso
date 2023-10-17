from flask import Flask


def auth_routes(app: Flask):
    @app.route("/auth")
    def auth_base():
        return {
            "identity": {
                "sub": "1234567890",
                "userName": "John Doe",
                "clientID": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            },
            "data": {},
        }
