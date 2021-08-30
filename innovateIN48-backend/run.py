from in48_app import in48_app
from in48_app import api_doc
from in48_app.config import Config
from in48_app.api.home_route import home_page
from in48_app.api.create_session import auth_session
from in48_app.api.transact import transact
from in48_app.api.create_account import create_account
from in48_app.api.inquire import inquire


in48_app.register_blueprint(home_page)
in48_app.register_blueprint(auth_session)
in48_app.register_blueprint(transact)
in48_app.register_blueprint(create_account)
in48_app.register_blueprint(inquire)
in48_app.register_blueprint(api_doc)

in48_app.config.from_object(Config)

if __name__ == '__main__':
    in48_app.run(debug=True)
