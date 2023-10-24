from flask_cors import CORS
from flask_openapi3 import OpenAPI

from app.db_init import init_database

from app.user import user_routes
from app.stats import stats_routes
from app.auth import auth_routes
from app.info import info_routes

# app = Flask(__name__)
# info = Info(title="book API", version="1.0.0")
app = OpenAPI(__name__)

app.config.from_pyfile("config.py")
CORS(app, expose_headers=["X-Access-Token", "X-Refresh-Token"])

auth_routes(app)
user_routes(app)
stats_routes(app)
info_routes(app)

init_database()
