from crypt import methods
from flask import Flask, jsonify, render_template, render_template_string, request
from app import models
from app.database import init_app
import os

template_dir = (os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'app', 'templates')
static_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app', 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

init_app(app)

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

#api de prueba de inicio de sesion,
@app.route('/sesion')
def inicioSesion():

@app.route('/auth')
def autorizacion():
    data = request.get_json()
    if not data:
        return jsonify({'error':'No se recibieron datos'}),400
    mail = data.get('email')
    password = data.get('password')
    
    
if __name__== '__main__':
    app.run(debug=True)
    