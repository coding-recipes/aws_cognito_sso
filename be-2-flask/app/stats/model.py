from datetime import datetime
from typing import Any
from sqlalchemy import String, Integer, Float, DateTime, Column, BigInteger
from app.db import Base


class Stat(Base):
    __tablename__ = "stats"
    id: int = Column(BigInteger, primary_key=True, autoincrement=True)
    kpi: str = Column(String(50))
    period: str = Column(String(12))
    year: int = Column(Integer)
    month: int = Column(Integer)
    value: float = Column(Float)
    createdDate: datetime = Column(DateTime, name="created_date")
    updatedDate: datetime = Column(DateTime, name="updated_date")

    def __init__(self, **kw: Any):
        super().__init__(**kw)

    def to_json(self):
        return {
            "id": self.id,
            "kpi": self.kpi,
            "period": self.period,
            "year": self.year,
            "month": self.month,
            "value": self.value,
            "createdDate": self.createdDate,
            "updatedDate": self.updatedDate,
        }
