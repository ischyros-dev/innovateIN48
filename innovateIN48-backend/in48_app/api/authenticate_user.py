from flask import request, session, jsonify
from functools import wraps
from in48_app import in48_app
import jwt


def authenticate_user(func):
    @wraps(func)
    def verify_user(*args, **kwargs):
        api_key = request.headers.get('api_key')

        if not api_key:
            return jsonify({'message': 'Missing token!'}), 401

        try:
            data = jwt.decode(api_key, in48_app.config['SECRET_KEY'], algorithm=["HS256"])
            if data['user'] not in session:
                raise jwt.InvalidTokenError
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Session expired!'}), 401
        except:
            return jsonify({'message': 'Invalid token!'}), 403

        return func()

    return verify_user
