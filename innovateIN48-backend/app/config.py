import json
import os

currdir = os.getcwd()
with open(currdir + '/config.json') as config_file:
    config = json.load(config_file)


class Config:
    SECRET_KEY = config.get('secret_key')
    MYSQL_DB = config.get('db')
    MYSQL_HOST = config.get('db_host')
    MYSQL_USER = config.get('db_user')
    MYSQL_PASSWORD = config.get('db_password')
    MYSQL_CURSORCLASS = 'DictCursor'
