from in48_app import app_db


class Account:
    table_name = 'Accounts Master File'

    def __init__(self, acct_no=None):
        self.acct_no = ''
        self.cust_no = ''
        self.balance = 0
        if acct_no is not None:
            self.acct_no = acct_no
            cur = app_db.connection.cursor()
            try:
                cur.execute(f"SELECT CustomerNumber, Balance "
                            f"FROM `{self.table_name}` "
                            f"WHERE AccountNumber={self.acct_no}")
                result = cur.fetchone()
                self.cust_no = result['CustomerNumber']
                self.balance = result['Balance']
            except:
                raise

    def add(self):
        cur = app_db.connection.cursor()
        try:
            cur.execute(f"INSERT INTO `{self.table_name}` (CustomerNumber, AccountNumber, Balance) "
                        f"VALUES('{self.cust_no}', '{self.acct_no}', {self.balance})")
            app_db.connection.commit()
        except:
            raise

    def remove(self):
        cur = app_db.connection.cursor()
        try:
            cur.execute(f"DELETE FROM `{self.table_name}` WHERE AccountNumber={self.acct_no}")
            app_db.connection.commit()
        except:
            raise

    def update(self):
        cur = app_db.connection.cursor()
        try:
            cur.execute(f"UPDATE `{self.table_name}` "
                        f"SET Balance={self.balance} "
                        f"WHERE AccountNumber={self.acct_no}")
            app_db.connection.commit()
        except:
            raise


class Customer:
    table_name = "Customer File"

    def __init__(self, cust_no=None):
        self.cust_no = ''
        self.pword = ''
        self.lname = ''
        self.fname = ''
        if cust_no is not None:
            self.cust_no = cust_no
            cur = app_db.connection.cursor()
            try:
                cur.execute(f"SELECT Password, LastName, FirstName "
                            f"FROM `{self.table_name}` "
                            f"WHERE Username={self.cust_no}")
                result = cur.fetchone()
                print(result)
                self.pword = result['Password']
                self.lname = result['LastName']
                self.fname = result['FirstName']
            except:
                raise

    def add(self):
        cur = app_db.connection.cursor()
        try:
            cur.execute(f"INSERT INTO `{self.table_name}` (Username, Password, LastName, FirstName) "
                        f"VALUES('{self.cust_no}', '{self.pword}', '{self.lname}', '{self.fname}')")
            app_db.connection.commit()
        except:
            raise

    def remove(self):
        cur = app_db.connection.cursor()
        try:
            cur.execute(f"DELETE FROM `{self.table_name}` WHERE Username={self.cust_no}")
            app_db.connection.commit()
        except:
            raise

    def update(self):
        cur = app_db.connection.cursor()
        try:
            cur.execute(f"UPDATE `{self.table_name}` "
                        f"SET Password={self.pword}, LastName={self.lname}, FirstName={self.fname} "
                        f"WHERE Username={self.cust_no}")
            app_db.connection.commit()
        except:
            raise


class Transaction:
    table_name = 'Transaction File'

    def __init__(self, cust_no=None, acct_no=None, tran_type=None, tran_amt=None, date_time=None):
        self.cust_no = cust_no
        self.acct_no = acct_no
        self.tran_type = tran_type
        self.date_time = date_time
        self.tran_amt = tran_amt

    def get_curr_index(self):
        cur = app_db.connection.cursor()
        try:
            cur.execute(f"SELECT MAX(TransactionFile_ID) FROM `{self.table_name}`")
            result = cur.fetchone()
            curr_index = result['MAX(TransactionFile_ID)']
            tran_id = f"CONCAT('TXN', LPAD('{curr_index + 1}', 10, 0))"
            return curr_index
        except:
            raise

    def add(self):
        cur = app_db.connection.cursor()
        try:
            tran_id = self.get_curr_index() + 1
            cur.execute(f"INSERT INTO `{self.table_name}` "
                        f"(CustomerNumber, AccountNumber, Tran_ID, Tran_DateTime, Tran_Type, Tran_Amount) "
                        f"VALUES('{self.cust_no}', '{self.acct_no}', CONCAT('TXN', LPAD({tran_id}, 10, 0)), "
                        f"'{self.date_time}', '{self.tran_type}', {self.tran_amt})")
            app_db.connection.commit()
        except:
            raise
