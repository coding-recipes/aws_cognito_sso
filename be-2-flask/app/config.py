import os

PORT = os.environ.get("PORT", 8000)
DEBUG = False
TESTING = False

DATABASE_URI = (
    "sqlite://"  # in-memory database, comment this line to use a persistent database
)

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
