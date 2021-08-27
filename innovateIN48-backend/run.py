from app import app
from app.config import Config
from app.api.routes import api


app.register_blueprint(api)
app.config.from_object(Config)

if __name__ == '__main__':
    app.run(debug=True)

