# innovateIN48-backend

Bank transaction APIs

## Requirements
- MySQL - [Setup and installation](https://dev.mysql.com/doc/refman/8.0/en/installing.html)

Configure a valid account that will be used in step 5 of the setup procedure. Run innovateIN48.sql to create the database and tables for testing purposes.

- Python3 - [Setup and installation](https://docs.python.org/3/using/index.html)

Python installation should include [PIP](https://docs.python.org/3/installing/index.html) and [virtual environment](https://docs.python.org/3/tutorial/venv.html) packages.


## Setup

1. Change directory to innovateIN48-backend folder
```
$ cd <path_to_innovateIN48-backend>/innovateIN48-backend
```

2. Create a virtual environment
```
$ python -m venv venv
```

3. Activate virtual environment
```
$ source venv/bin/activate
(venv)$
```

Prompt gets prefixed with '(venv)' upon successful activation.

4. Install the dependecy packages listed in requirements.txt.
```
(venv)$ pip install -r requirements.txt
Collecting wheel==0.37.0
  Using cached wheel-0.37.0-py2.py3-none-any.whl (35 kB)
Collecting cffi==1.14.6
  Using cached cffi-1.14.6-cp38-cp38-manylinux1_x86_64.whl (411 kB)
Collecting click==8.0.1
  Using cached click-8.0.1-py3-none-any.whl (97 kB)
Collecting cryptography==3.4.7
  Using cached cryptography-3.4.7-cp36-abi3-manylinux2014_x86_64.whl (3.2 MB)
Collecting Flask==2.0.1
  Using cached Flask-2.0.1-py3-none-any.whl (94 kB)
Processing /home/dpaje/.cache/pip/wheels/08/dd/b3/5f7e5b2df5452362c7273b6e7e5554f3855cfc447e7440ec7e/Flask_MySQLdb-0.2.0-py3-none-any.whl
Processing /home/dpaje/.cache/pip/wheels/69/ce/07/2361a747d34780afa5fc2d45a1703df920f73905a7f009ce0b/flask_swagger_ui-3.36.0-py3-none-any.whl
Collecting itsdangerous==2.0.1
  Using cached itsdangerous-2.0.1-py3-none-any.whl (18 kB)
Collecting Jinja2==3.0.1
  Using cached Jinja2-3.0.1-py3-none-any.whl (133 kB)
Collecting MarkupSafe==2.0.1
  Using cached MarkupSafe-2.0.1-cp38-cp38-manylinux2010_x86_64.whl (30 kB)
Processing /home/dpaje/.cache/pip/wheels/3a/c1/c3/5a19639a551c921c2c2b39468f4278ce5aa27b4e386a4158e4/mysqlclient-2.0.3-cp38-cp38-linux_x86_64.whl
Collecting pycparser==2.20
  Using cached pycparser-2.20-py2.py3-none-any.whl (112 kB)
Collecting PyJWT==2.1.0
  Using cached PyJWT-2.1.0-py3-none-any.whl (16 kB)
Collecting Werkzeug==2.0.1
  Using cached Werkzeug-2.0.1-py3-none-any.whl (288 kB)
Installing collected packages: wheel, pycparser, cffi, click, cryptography, Werkzeug, itsdangerous, MarkupSafe, Jinja2, Flask, mysqlclient, Flask-MySQLdb, flask-swagger-ui, PyJWT
Successfully installed Flask-2.0.1 Flask-MySQLdb-0.2.0 Jinja2-3.0.1 MarkupSafe-2.0.1 PyJWT-2.1.0 Werkzeug-2.0.1 cffi-1.14.6 click-8.0.1 cryptography-3.4.7 flask-swagger-ui-3.36.0 itsdangerous-2.0.1 mysqlclient-2.0.3 pycparser-2.20 wheel-0.37.0
```
5. Edit config.json in in48_app/static folder.
```
{
    "secret_key": "secretkey",
    "db": "innovateIN48",
    "db_host": "localhost",
    "db_user": "",
    "db_password": ""
}
```

Set db_user and db_password to a valid account configured during mysql server setup and installation.

6. Run the application.
```
(venv)$ python run.py
 * Serving Flask app 'in48_app' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 351-465-883
```

A 'Welcome!' message should display when application is accessed via http://localhost:5000.

Re-activate virtual environment in step 3 if exited and application should be re-run.

## Services

While application is running, API documentation can be viewed via http://localhost:5000/api/doc.
