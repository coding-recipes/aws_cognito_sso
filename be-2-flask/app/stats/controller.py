from flask import Flask, request
from .data_generator import create_records, StatRecords
from app.auth import auth_guard, UserIdentity


def stats_routes(app: Flask):
    @app.route("/stats")
    @auth_guard
    def get_stat_req(_: UserIdentity) -> StatRecords:
        return create_records()
