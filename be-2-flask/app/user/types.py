from pydantic import BaseModel
from auth import UserIdentity
from typing import Any


class UserData(BaseModel):
    identity: UserIdentity
    data: dict
