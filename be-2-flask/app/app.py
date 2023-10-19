from flask import Flask
from flask_cors import CORS
from flask_openapi3 import Info, Tag
from flask_openapi3 import OpenAPI

from app.user import user_routes
from app.stats import stats_routes
from app.auth import auth_routes

# app = Flask(__name__)
app = OpenAPI(__name__)
app.config.from_pyfile("config.py")
CORS(app, expose_headers=["X-Access-Token", "X-Refresh-Token"])

# info = Info(title="book API", version="1.0.0")
# app = OpenAPI(__name__, info=info)
# book_tag = Tag(name="book", description="Some Book")

auth_routes(app)
user_routes(app)
stats_routes(app)
