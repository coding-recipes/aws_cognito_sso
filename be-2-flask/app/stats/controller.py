from flask import Flask


def stats_routes(app: Flask):
    @app.route("/stats")
    def stat():
        return "This is the stat page"

    return app
