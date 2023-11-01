from flask_openapi3 import OpenAPI
from pydantic import BaseModel
from config import REPO
class ServerInfo(BaseModel):
    swagger: str
    framework: str
    version: str
    language: str
    repo: str


def info_routes(app: OpenAPI):
    @app.get("/info/server", responses={200: ServerInfo})
    def req_server_info():
        return  {
            "swagger": "/openapi",
            "framework": "Flask",
            "version": "0.0.1",
            "language": "Python3",
            "repo": REPO
        }

