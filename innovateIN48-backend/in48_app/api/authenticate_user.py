from flask import request, session, jsonify
from functools import wraps
from in48_app import in48_app
import jwt


def authenticate_user(func):
    @wraps(func)
    def verify_user(*args, **kwargs):
        transaction_token = request.args.get('token')

        if not transaction_token:
            return jsonify({'message': 'Missing token!'}), 401

        try:
            data = jwt.decode(transaction_token, in48_app.config['SECRET_KEY'])
            if data['user'] not in session:
                raise jwt.InvalidTokenError

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired!'}), 401

        except:
            return jsonify({'message': 'Invalid token!'}), 403

        return func(*args, **kwargs)

    return verify_user
