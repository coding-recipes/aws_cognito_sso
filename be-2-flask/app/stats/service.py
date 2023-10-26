from .model import Stat
from db import get_session
from .mock import generate_records
from .dto import StatRecord


class StatService:
    @staticmethod
    def get_stat_records() -> list[StatRecord]:
        with get_session() as session:
            records = session.query(Stat).all()
            return [record.to_json() for record in records]

    @staticmethod
    def init_data():
        with get_session() as session:
            records: list[Stat] = generate_records()
            session.bulk_save_objects(records)
            session.commit()
