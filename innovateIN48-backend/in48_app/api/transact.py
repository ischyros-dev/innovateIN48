from flask import Blueprint, request, jsonify
from flask_cors import CORS
from datetime import datetime
from in48_app.api.authenticate_user import authenticate_user
from in48_app import app_db
from .models import Account, Transaction

transact = Blueprint('transact', __name__)
CORS(transact)


@transact.route('/enrol', methods=['POST'])
@authenticate_user
def enrol(cust_no):
    account = Account()
    account.cust_no = cust_no
    account.acct_no = request.json['acct_no']
    account.balance = request.json['deposit_amt']

    try:
        account.add()
        return jsonify({'msg': 'Account enrollment completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400
    except AssertionError as ass_err:
        return jsonify({'msg': str(ass_err)}), 400


@transact.route('/inquire', methods=['GET'])
@authenticate_user
def inquire(cust_no):
    try:
        account = Account(request.args.get('acct_no'))
        if account.cust_no != cust_no:
            return jsonify({'msg': 'Invalid account.'}), 400
        else:
            return jsonify({'balance': float(account.balance)}), 200
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400
    except AssertionError as ass_err:
        return jsonify({'msg': str(ass_err)}), 400


@transact.route('/withdraw', methods=['POST'])
@authenticate_user
def withdraw(cust_no):
    try:
        account = Account(request.json['acct_no'])

        if account.cust_no != cust_no:
            return jsonify({'msg': 'Invalid account.'}), 400
        else:
            amount = request.json['amount']

            if amount <= 0:
                return jsonify({'msg': 'Invalid amount.'}), 400
            if amount > account.balance:
                return jsonify({'msg': 'Insufficient funds.'}), 400

            account.balance -= amount
            account.update()

            transaction = Transaction(cust_no=account.cust_no, acct_no=account.acct_no, tran_type='Withdrawal',
                                      tran_amt=amount, date_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            transaction.add()
            return jsonify({'msg': 'Fund withdrawal completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400
    except AssertionError as ass_err:
        return jsonify({'msg': str(ass_err)}), 400


@transact.route('/deposit', methods=['POST'])
@authenticate_user
def deposit(cust_no):
    try:
        account = Account(request.json['acct_no'])

        if account.cust_no != cust_no:
            return jsonify({'msg': 'Invalid account.'}), 400
        else:
            amount = request.json['amount']
            if amount <= 0:
                return jsonify({'msg': 'Invalid amount.'}), 400

            account.balance += amount
            account.update()

            transaction = Transaction(cust_no=account.cust_no, acct_no=account.acct_no, tran_type='Deposit',
                                      tran_amt=amount, date_time=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
            transaction.add()
            return jsonify({'msg': 'Fund deposit completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400
    except AssertionError as ass_err:
        return jsonify({'msg': str(ass_err)}), 400


@transact.route('/transfer', methods=['POST'])
@authenticate_user
def transfer(cust_no):
    try:
        from_account = Account(request.json['from_acct_no'])

        if from_account.cust_no != cust_no:
            return jsonify({'msg': 'Invalid account.'}), 400
        else:
            amount = request.json['amount']

            if amount <= 0:
                return jsonify({'msg': 'Invalid amount.'}), 400
            if amount > from_account.balance:
                return jsonify({'msg': 'Insufficient funds.'}), 400

            tran_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            from_account.balance -= amount
            from_transaction = Transaction(cust_no=from_account.cust_no, acct_no=from_account.acct_no,
                                           tran_type='Transfer', tran_amt=amount, date_time=tran_datetime)
            from_account.update()
            from_transaction.add()

            to_account = Account(request.json['to_acct_no'])

            to_account.balance += amount
            to_transaction = Transaction(cust_no=to_account.cust_no, acct_no=to_account.acct_no,
                                         tran_type='Deposit', tran_amt=amount, date_time=tran_datetime)
            to_account.update()
            to_transaction.add()

            return jsonify({'msg': 'Fund transfer completed.'}), 201
    except app_db.connection.Error as db_err:
        return jsonify({'msg': str(db_err)}), 400
    except AssertionError as ass_err:
        return jsonify({'msg': str(ass_err)}), 400
