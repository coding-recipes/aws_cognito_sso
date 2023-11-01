import os

DEBUG = False
TESTING = False

PORT = os.environ.get("PORT", 8000)

COGNITO_POOL_ID = os.environ["COGNITO_POOL_ID"]
COGNITO_CLIENT_ID = os.environ["COGNITO_CLIENT_ID"]
COGNITO_CLIENT_SECRET = os.environ["COGNITO_CLIENT_SECRET"]
COGNITO_CLIENT_DOMAIN = os.environ["COGNITO_CLIENT_DOMAIN"]
COGNITO_CLIENT_REGION = os.environ["COGNITO_CLIENT_REGION"]

REPO = os.environ["REPO"]

DATABASE_URI = "sqlite://"  # in-memory database, comment this line to use a persistent database
