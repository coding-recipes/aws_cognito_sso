from flask import Flask
from flask_cors import CORS
from app.user.controller import user_routes
from app.stats.controller import stats_routes
from app.auth.controller import auth_routes

app = Flask(__name__)
app.config.from_pyfile("config.py")
CORS(app)

auth_routes(app)
user_routes(app)
stats_routes(app)
