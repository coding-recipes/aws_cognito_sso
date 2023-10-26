from db import Base, get_db_engine
from stats import StatService


def init_database():
    engine = get_db_engine()
    Base.metadata.create_all(engine)
    StatService.init_data()
