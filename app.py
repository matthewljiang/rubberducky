from flask import Flask
from flask import send_file, make_response, render_template
from api.api import api
import db.db

app = Flask(__name__, static_url_path='/dist', static_folder='client/dist')

app.register_blueprint(api, url_prefix='/api')

@app.route('/')
@app.route('/<path:p>')
def ui(p=None):
    return render_template('index.html'), 200

if __name__ == '__main__':
    app.run('0.0.0.0', 5000)
