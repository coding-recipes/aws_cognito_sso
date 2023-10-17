# echo $@
source .venv/bin/activate
pip install $@
pip freeze > requirements.txt
deactivate