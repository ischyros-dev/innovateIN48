from flask import Blueprint
from in48_app.api.authenticate_user import authenticate_user


inquire = Blueprint('inquire', __name__)


@inquire.route('/inquire', methods=['GET'])
@authenticate_user
def do_inquire():
    return 'TODO'
