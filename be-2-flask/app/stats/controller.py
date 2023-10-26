from flask_openapi3 import OpenAPI
from auth import auth_guard, UserIdentity
from .service import StatService

from .dto import StatRecords
from flask import Flask


def stats_routes(app: Flask):
    @app.get("/stats", responses={200: StatRecords})
    @auth_guard
    def get_stat_req(_: UserIdentity):
        return {"data": StatService.get_stat_records()}
