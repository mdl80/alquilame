from crypt import methods
from flask import Flask, jsonify, render_template, render_template_string, request

from app import models
from app.database import init_app
import os


template_dir = (os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'app', 'templates')
static_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app', 'static')

app = Flask(__name__)

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

#api de prueba de inicio de sesion,FUNCIONA
@app.route('/sesion')
def inicioSesion():
    return render_template('inicio_sesion.html')

#api de prueba para perfil recibe el id de usuario y envia los datos para que lo cargeu la vista
@app.route('/perfil')
def perfil():
    return render_template('perfil.html')

#api que recibe datos de usuario y contraseña devuelve true o false y lo devuelve al front
@app.route('/auth', methods=['POST'])
def autorizacion():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No se recibieron datos'}), 400
    
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email y contraseña son requeridos'}), 400
    
    idUsuario = models.User.authLoguin(email, password)
    print('el id de usuario es:' + str(idUsuario))
    
    if idUsuario >= 1:
        return jsonify({'validado': True, 'idUsuario': idUsuario, 'email': email}), 200
    else:
        return jsonify({'validado': False, 'idUsuario': -1}), 401
    
if __name__== '__main__':
    app.run(debug=True)
    