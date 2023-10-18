from flask import Flask
from flask_cors import CORS
from app.user import user_routes
from app.stats import stats_routes
from app.auth import auth_routes

app = Flask(__name__)
app.config.from_pyfile("config.py")
CORS(app, expose_headers=["X-Access-Token", "X-Refresh-Token"])

auth_routes(app)
user_routes(app)
stats_routes(app)
