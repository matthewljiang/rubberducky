from flask import Flask
from api.api import api
import db.db

app = Flask(__name__, static_url_path='/dist', static_folder='dist')

app.register_blueprint(api, url_prefix='/api')

@app.route('/')

def ui(p=None):
    return render_template('index.html'), 200

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
