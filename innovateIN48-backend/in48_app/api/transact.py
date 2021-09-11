from flask import Blueprint, request, jsonify
from flask_cors import CORS
from datetime import datetime
from in48_app.api.authenticate_user import authenticate_user
from in48_app import app_db
from .models import Account, Customer, Transaction

transact = Blueprint('transact', __name__)
CORS(transact)


@transact.route('/enrol', methods=['POST'])
@authenticate_user
def enrol():
    customer = Customer(request.json['cust_id'])

    account = Account()
    account.cust_no = customer.cust_no
    account.acct_no = request.json['acct_no']
    account.balance = request.json['deposit_amt']

    try:
        account.add()
        return jsonify({'msg': 'Account enrollment completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400


@transact.route('/inquire', methods=['GET'])
@authenticate_user
def inquire():
    account_number = request.args.get('acct_no')

    try:
        account = Account(account_number)
        return jsonify({'balance': float(account.balance)}), 200
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400


@transact.route('/withdraw', methods=['POST'])
@authenticate_user
def withdraw():
    account = Account(request.json['acct_no'])
    amount = request.json['amount']

    if amount <= 0:
        return jsonify({'msg': 'Invalid amount.'}), 400

    transaction = Transaction(cust_no=account.cust_no, acct_no=account.acct_no, tran_type='Withdrawal',
                              tran_amt=amount, date_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    if amount > account.balance:
        return jsonify({'msg': 'Insufficient funds.'}), 400

    try:
        account.balance -= amount
        account.update()
        transaction.add()
        return jsonify({'msg': 'Fund withdrawal completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400


@transact.route('/deposit', methods=['POST'])
@authenticate_user
def deposit():
    account = Account(request.json['acct_no'])
    amount = request.json['amount']

    if amount <= 0:
        return jsonify({'msg': 'Invalid amount.'}), 400

    transaction = Transaction(cust_no=account.cust_no, acct_no=account.acct_no, tran_type='Deposit',
                              tran_amt=amount, date_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    try:
        account.balance += amount
        account.update()
        transaction.add()
        return jsonify({'msg': 'Fund deposit completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400


@transact.route('/transfer', methods=['POST'])
@authenticate_user
def transfer():
    from_account = Account(request.json['from_acct_no'])
    to_account = Account(request.json['to_acct_no'])
    amount = request.json['amount']

    if amount <= 0:
        return jsonify({'msg': 'Invalid amount.'}), 400

    if amount > from_account.balance:
        return jsonify({'msg': 'Insufficient funds.'}), 400

    from_account.balance -= amount
    from_transaction = Transaction(cust_no=from_account.cust_no, acct_no=from_account.acct_no, tran_type='Transfer',
                                   tran_amt=amount, date_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    to_account.balance += amount
    to_transaction = Transaction(cust_no=to_account.cust_no, acct_no=to_account.acct_no, tran_type='Deposit',
                                 tran_amt=amount, date_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))

    try:
        from_account.update()
        from_transaction.add()
        to_account.update()
        to_transaction.add()
        return jsonify({'msg': 'Fund transfer completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400
