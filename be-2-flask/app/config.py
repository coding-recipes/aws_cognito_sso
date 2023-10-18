import os

DEBUG = False
TESTING = False

PORT = os.environ.get("PORT", 8000)

COGNITO_POOL_ID = os.environ["COGNITO_POOL_ID"]
COGNITO_CLIENT_ID = os.environ["COGNITO_CLIENT_ID"]
COGNITO_CLIENT_SECRET = os.environ["COGNITO_CLIENT_SECRET"]
COGNITO_CLIENT_DOMAIN = os.environ["COGNITO_CLIENT_DOMAIN"]
COGNITO_CLIENT_REGION = os.environ["COGNITO_CLIENT_REGION"]

DATABASE_URI = "sqlite://"  # in-memory database, comment this line to use a persistent database

# DB_CLUSTER = os.environ["DB_CLUSTER"]
# DB_CLUSTER_RO = os.environ["DB_CLUSTER_RO"]
# DB_CLUSTER_PORT = os.environ["DB_CLUSTER_PORT"]
# DB_USERNAME = os.environ["DB_USERNAME"]
# DB_PASSWORD = os.environ["DB_PASSWORD"]
# DB_NAME = os.environ["DB_NAME"]

# DB_URL = (
#     f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_CLUSTER}:{DB_CLUSTER_PORT}/{DB_NAME}"
# )
# DB_URL_RO = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_CLUSTER_RO}:{DB_CLUSTER_PORT}/{DB_NAME}"
# DB_URI2 = "sqlite:///your_database.db"
