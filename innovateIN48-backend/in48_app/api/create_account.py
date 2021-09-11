from flask import Blueprint, request, jsonify
from flask_cors import CORS
from in48_app import app_db
from .models import Customer, Account

create_account = Blueprint('create_account', __name__)
CORS(create_account)


@create_account.route('/create', methods=['POST'])
def create():
    customer = Customer()
    customer.cust_no = request.json['cust_id']
    customer.pword = request.json['password']
    customer.lname = request.json['last_name']
    customer.fname = request.json['first_name']

    account = Account()
    account.cust_no = customer.cust_no
    account.acct_no = request.json['acct_no']
    account.balance = request.json['deposit_amt']

    try:
        customer.add()
        account.add()
        return jsonify({'msg': "Customer profile and account creation completed."}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400
