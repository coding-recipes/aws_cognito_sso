source .venv/bin/activate
direnv allow
# flask --app 'app:app' run
cd app
gunicorn -w 4 'main:app' --reload
deactivate