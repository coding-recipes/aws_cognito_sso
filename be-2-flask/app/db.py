__all__ = ["get_session"]

import contextlib
from sqlalchemy import create_engine, Engine
from sqlalchemy.orm import Session, DeclarativeBase

__engine: Engine = None

class Base(DeclarativeBase):
    pass


def get_db_engine():
    global __engine
    if __engine is None:
        __engine = create_engine("sqlite://")
    return __engine


@contextlib.contextmanager
def get_session():
    with Session(get_db_engine()) as session:
        yield session
