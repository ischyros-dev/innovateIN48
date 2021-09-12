from flask import Blueprint


home_page = Blueprint('home', __name__)


@home_page.route('/home', methods=['GET'])
def welcome():
    return '<h1> Welcome! </h1>'
