from in48_app import app_db


class Account:
    table_name = 'Accounts Master File'

    def __init__(self, acct_no=''):
        self.acct_no = acct_no
        self.cust_no = ''
        self.balance = 0
        if acct_no:
            try:
                cur = app_db.connection.cursor()
                cur.execute(f"SELECT CustomerNumber, Balance "
                            f"FROM `{self.table_name}` "
                            f"WHERE AccountNumber='{self.acct_no}'")
                result = cur.fetchone()
                assert result, "Non-existing account number."
                self.cust_no = result['CustomerNumber']
                self.balance = result['Balance']
            except:
                raise

    def add(self):
        try:
            cur = app_db.connection.cursor()
            assert self.cust_no and self.acct_no, "Missing account information."
            cur.execute(f"INSERT INTO `{self.table_name}` (CustomerNumber, AccountNumber, Balance) "
                        f"VALUES('{self.cust_no}', '{self.acct_no}', {self.balance})")
            app_db.connection.commit()
        except:
            raise

    def remove(self):
        try:
            cur = app_db.connection.cursor()
            cur.execute(f"DELETE FROM `{self.table_name}` WHERE AccountNumber='{self.acct_no}'")
            app_db.connection.commit()
        except:
            raise

    def update(self):
        try:
            cur = app_db.connection.cursor()
            cur.execute(f"UPDATE `{self.table_name}` "
                        f"SET Balance={self.balance} "
                        f"WHERE AccountNumber='{self.acct_no}'")
            app_db.connection.commit()
        except:
            raise


class Customer:
    table_name = "Customer File"

    def __init__(self, cust_no=''):
        self.cust_no = cust_no
        self.pword = ''
        self.lname = ''
        self.fname = ''
        if cust_no:
            try:
                cur = app_db.connection.cursor()
                cur.execute(f"SELECT Password, LastName, FirstName "
                            f"FROM `{self.table_name}` "
                            f"WHERE Username='{self.cust_no}'")
                result = cur.fetchone()
                assert result, "Non-existing customer number."
                if result:
                    self.pword = result['Password']
                    self.lname = result['LastName']
                    self.fname = result['FirstName']
            except:
                raise

    def add(self):
        try:
            cur = app_db.connection.cursor()
            assert self.cust_no and self.pword and self.lname and self.fname, "Missing customer profile information."
            cur.execute(f"INSERT INTO `{self.table_name}` (Username, Password, LastName, FirstName) "
                        f"VALUES('{self.cust_no}', '{self.pword}', '{self.lname}', '{self.fname}')")
            app_db.connection.commit()
        except:
            raise

    def remove(self):
        try:
            cur = app_db.connection.cursor()
            cur.execute(f"DELETE FROM `{self.table_name}` WHERE Username='{self.cust_no}'")
            app_db.connection.commit()
        except:
            raise

    def update(self):
        try:
            cur = app_db.connection.cursor()
            cur.execute(f"UPDATE `{self.table_name}` "
                        f"SET Password='{self.pword}', LastName='{self.lname}', FirstName='{self.fname}' "
                        f"WHERE Username='{self.cust_no}'")
            app_db.connection.commit()
        except:
            raise


class Transaction:
    table_name = 'Transaction File'

    def __init__(self, cust_no='', acct_no='', tran_type='', tran_amt='', date_time=''):
        self.cust_no = cust_no
        self.acct_no = acct_no
        self.tran_type = tran_type
        self.date_time = date_time
        self.tran_amt = tran_amt

    def get_curr_index(self):
        try:
            cur = app_db.connection.cursor()
            cur.execute(f"SELECT MAX(TransactionFile_ID) FROM `{self.table_name}`")
            result = cur.fetchone()
            if result:
                curr_index = result['MAX(TransactionFile_ID)']
                return curr_index
            else:
                return 0
        except:
            raise

    def add(self):
        try:
            cur = app_db.connection.cursor()
            tran_id = self.get_curr_index() + 1
            assert self.cust_no and self.acct_no and self.date_time and self.tran_type, "Missing transaction detail."
            cur.execute(f"INSERT INTO `{self.table_name}` "
                        f"(CustomerNumber, AccountNumber, Tran_ID, Tran_DateTime, Tran_Type, Tran_Amount) "
                        f"VALUES('{self.cust_no}', '{self.acct_no}', CONCAT('TXN', LPAD({tran_id}, 10, 0)), "
                        f"'{self.date_time}', '{self.tran_type}', {self.tran_amt})")
            app_db.connection.commit()
        except:
            raise
