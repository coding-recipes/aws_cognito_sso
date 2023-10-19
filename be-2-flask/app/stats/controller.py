from flask_openapi3 import OpenAPI
from .data_generator import create_records, StatRecords
from app.auth import auth_guard, UserIdentity


def stats_routes(app: OpenAPI):
    @app.get("/stats", responses={200: StatRecords})
    @auth_guard
    def get_stat_req(_: UserIdentity):
        return create_records()
