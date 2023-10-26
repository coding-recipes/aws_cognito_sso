rm requirements.txt
rm -rf .venv
python3 -m virtualenv .venv
source .venv/bin/activate
pip install -r requirements_o.txt
pip install flask[async]
pip freeze > requirements.txt
deactivate