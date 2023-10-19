from pydantic import BaseModel
from app.auth import UserIdentity
from typing import Any


class UserData(BaseModel):
    identity: UserIdentity
    data: dict
