from pydantic import BaseModel
from datetime import datetime


class StatRecord(BaseModel):
    id: int
    kpi: str
    period: str
    year: int
    month: int
    value: float
    createdDate: datetime
    updatedDate: datetime


class StatRecords(BaseModel):
    data: list[StatRecord]
