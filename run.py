from crypt import methods
from flask import Flask, jsonify, render_template, render_template_string, request
from flask_cors import CORS
from app import models
from app.database import init_app
from app.views import *
import os


app = Flask(__name__)

init_app(app)

template_dir = (os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'app', 'templates')
static_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app', 'static')

CORS(app)

@app.route('/registro')
def registro():
    
    return render_template('registro.html')

#api de prueba para verificar funcionamiento en base de datos
@app.route('/todos', methods=['GET'])
def todos():
    usuarios= models.User.get_all()
    return usuarios

@app.route('/recibir', methods=['POST'])
def recibir():
    data = request.get_json()
    return jsonify(data),200
    
if __name__== '__main__':
    app.run(debug=True)
    