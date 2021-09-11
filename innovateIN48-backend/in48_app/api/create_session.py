from flask import Blueprint, request, jsonify, session
from flask_cors import CORS
from in48_app import in48_app
from .models import Customer
import jwt
import datetime

auth_session = Blueprint('auth_session', __name__)
CORS(auth_session)


@auth_session.route('/authsession', methods=['POST', 'DELETE'])
def authsession():
    if request.method == 'POST':
        customer = Customer(cust_no=request.json['cust_id'])
        if customer.pword == request.json['password']:
            if customer.cust_no in session:
                session.pop(customer.cust_no)

            api_key = jwt.encode({'user': customer.cust_no,
                                 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=120)
                                  },
                                 in48_app.config['SECRET_KEY'], algorithm="HS256")
            session[customer.cust_no] = api_key.decode('UTF-8')
            return jsonify({'api_key': api_key.decode('UTF-8')}), 200
        else:
            return jsonify({'msg': 'Invalid Credentials!'}), 403

    if request.method == 'DELETE':
        cust_id = request.args.get('cust_id')
        if cust_id in session:
            session.pop(cust_id)
            return jsonify({'msg': "Session terminated."}), 200

        return jsonify({'msg': "No active session!"}), 401
