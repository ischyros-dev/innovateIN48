from flask import Blueprint, request, jsonify
from in48_app.api.authenticate_user import authenticate_user


transact = Blueprint('transact', __name__)


@transact.route('/transact', methods=['POST'])
@authenticate_user
def do_transact():
    transaction_type = ('deposit', 'withdraw', 'transfer')

    if request.json('type') not in transaction_type:
        return jsonify({'message': 'Invalid transaction!'}), 400

    if request.json('type') == transaction_type[0]:
        pass

    if request.json('type') == transaction_type[1]:
        pass

    if request.json('type') == transaction_type[2]:
        pass

    return 'TODO'
