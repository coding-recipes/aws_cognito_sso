__all__ = ["get_session"]

import contextlib
from sqlalchemy import create_engine, Engine
from sqlalchemy.orm import Session, DeclarativeBase

__engine: Engine = None


class Base(DeclarativeBase):
    pass


def get_db_engine():
    global __engine
    # db_url = DATABASE_URI
    # connect_args = ({"connect_timeout": 5, "options": "-c timezone=utc"},)
    if __engine is None:
        # __engine = create_engine(db_url, connect_args=connect_args)
        # __engine = create_engine("sqlite://", echo=True)
        __engine = create_engine("sqlite://")
    return __engine


@contextlib.contextmanager
def get_session():
    with Session(get_db_engine()) as session:
        yield session
