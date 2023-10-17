__all__ = ["create_records", "StatRecord", "StatRecords"]

from datetime import datetime
from random import randint
from typing import TypedDict


class StatRecord(TypedDict):
    id: int
    kpi: str
    period: str
    year: int
    month: int
    value: float
    createdDate: datetime
    updatedDate: datetime


StatRecords = list[StatRecord]


def create_record(year: int, month: int, kpi: str, value: float):
    return {
        "id": 1,
        "kpi": kpi,
        "period": f"{year}{month:02}",
        "year": year,
        "month": month,
        "value": value,
        "createdDate": datetime.now(),
        "updatedDate": datetime.now(),
    }


def create_records():
    data: StatRecords = []
    for year in range(2019, 2021):
        for month in range(1, 12):
            for kpi in ["revenue", "profit", "cost"]:
                data.append(create_record(year, month, kpi, randint(1, 1000)))
    return data
