from flask import Flask
from flask_mysqldb import MySQL
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS


SWAGGER_URL = '/api/doc'
API_URL = '/static/api_doc.json'
api_doc = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': 'InnovationIN48'}
)

in48_app = Flask(__name__)
CORS(in48_app)
mydb = MySQL(in48_app)
