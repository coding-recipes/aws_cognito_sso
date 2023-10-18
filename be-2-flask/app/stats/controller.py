from flask import Flask
from .data_generator import create_records, StatRecords
from app.auth import auth_guard


def stats_routes(app: Flask):
    @app.route("/stats")
    @auth_guard
    def get_stat_req() -> StatRecords:
        return create_records()
