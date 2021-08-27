from flask import Blueprint, request, jsonify, session
from app import mydb, app
from functools import wraps
import jwt
import datetime


api = Blueprint('api', __name__)


def authenticate_user(func):
    @wraps(func)
    def verify_user(*args, **kwargs):
        transaction_token = request.args.get('token')

        if not transaction_token:
            return jsonify({'message': 'Missing token!'}), 401

        try:
            data = jwt.decode(transaction_token, app.config['SECRET_KEY'])
            if data['user'] not in session:
                raise jwt.InvalidTokenError

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Toke expired!'}), 401

        except:
            return jsonify({'message': 'Invalid token!'}), 403

        return func(*args, **kwargs)

    return verify_user


@api.route('/login', methods=['POST'])
def login():
    username = request.json['userid']
    password = request.json['password']

    if username and password:
        if username in session:
            session.pop(username)

        cur = mydb.connection.cursor()
        cur.execute('SELECT Password FROM `Customer File` WHERE Username = %s', (username,))
        userdetails = cur.fetchone()
        cur.close()

        if userdetails['Password'] == password:
            token = jwt.encode({'user': username,
                                'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60)
                                },
                               app.config['SECRET_KEY'])
            session[username] = token

            return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid Credentials!'}), 403


@api.route('/logout', methods=['POST'])
def logout():
    username = request.json['userid']
    if username in session:
        session.pop(username)

    return jsonify({'message': "Successfully logged out."}), 200


@api.route('/inquire', methods=['GET'])
@authenticate_user
def inquire():
    return 'TODO'


@api.route('/transact', methods=['POST'])
@authenticate_user
def transact():
    return 'TODO'


@api.route('/create', methods=['POST'])
def create_account():
    return 'TODO'
