from flask import Blueprint, request, jsonify, session
from flask_cors.decorator import cross_origin
from in48_app import mydb, in48_app
import jwt
import datetime


auth_session = Blueprint('auth_session', __name__)


@auth_session.route('/login', methods=['POST'])
@cross_origin()
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
                               in48_app.config['SECRET_KEY'])
            session[username] = token

            return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid Credentials!'}), 403


@auth_session.route('/logout', methods=['POST'])
def logout():
    username = request.args.get('userid')
    if username in session:
        session.pop(username)
        return jsonify({'message': "Successfully logged out."}), 200

    return jsonify({'message': "No active session!"}), 401
