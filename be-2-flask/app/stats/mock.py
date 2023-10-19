__all__ = ["generate_records", "StatRecord", "StatRecords"]

from datetime import datetime
from random import randint

from .model import Stat

stat_i = 0


def stat_default():
    global stat_i
    stat_i += 1
    return stat_i


def generate_record(year: int, month: int, kpi: str, value: float) -> Stat:
    return Stat(
        id=stat_default(),
        kpi=kpi,
        period=f"{year}{month:02}",
        year=year,
        month=month,
        value=value,
        createdDate=datetime.now(),
        updatedDate=datetime.now(),
    )


def generate_records() -> list[Stat]:
    data: list[Stat] = []
    for year in range(2019, 2021):
        for month in range(1, 12):
            for kpi in ["revenue", "profit", "cost"]:
                data.append(generate_record(year, month, kpi, randint(1, 1000)))
    return data
