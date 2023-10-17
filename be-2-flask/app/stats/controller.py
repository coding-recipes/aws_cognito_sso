from flask import Flask
from .data_generator import create_records, StatRecords


def stats_routes(app: Flask):
    @app.route("/stats")
    def get_stat() -> StatRecords:
        return create_records()
