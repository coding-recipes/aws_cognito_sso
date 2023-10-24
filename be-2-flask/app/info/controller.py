from flask_openapi3 import OpenAPI
from pydantic import BaseModel

class ServerInfo(BaseModel):
    swagger: str
    framework: str
    version: str
    language: str


def info_routes(app: OpenAPI):
    @app.get("/info/server", responses={200: ServerInfo})
    def req_server_info():
        return  {
            "swagger": "/openapi/swagger",
            "framework": "Flask",
            "version": "0.0.1",
            "language": "Python3",
        }

