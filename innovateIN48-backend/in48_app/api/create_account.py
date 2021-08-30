from flask import Blueprint


create_account = Blueprint('create_account', __name__)


@create_account.route('/create', methods=['POST'])
def create():
    return 'TODO'
