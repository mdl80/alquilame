from crypt import methods
from urllib import response
from flask import Flask, Response, jsonify, render_template, render_template_string, request
from app import models
from app.database import init_app
import os

template_dir = (os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'app', 'templates')
static_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'app', 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

init_app(app)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/registro')
def registro():
    
    return render_template('registro.html')

#*****Copiar desde aca *****

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
    
    if idUsuario >= 1:
        return jsonify({'validado': True, 'idUsuario': idUsuario, 'email': email}), 200
    else:
        return jsonify({'validado': False, 'idUsuario': -1}), 401
    
@app.route('/getById', methods=['POST'])
def getById():
    data = request.get_json()
    id = data.get('idUsuario')
    usuario = models.User.get_by_id(id)
    usuario = {
            'nombreUsuario': usuario[1],
            'DNI': usuario[2],
            'direccion': usuario[3],
            'codigoPostal': usuario[4],
            'email': usuario[5],
            'password':usuario[6],
            'razonSocial': usuario[7],
            'matricula': usuario[8],
            'idRol':usuario[9]
    }
    return jsonify(usuario),200

@app.route('/guardar',methods=['POST'])
def guardar():
    usuario = request.get_json()
    resultado = models.User.save(usuario)
    if(resultado >0):
        return jsonify({'exito':True}),200
    else:
        return jsonify({'exito':False}),500

@app.route('/actualizar', methods=['PUT'])
def actualizar():
    data = request.get_json()
    resultado = models.User.update(data)
    return {'estado': resultado}, 200

@app.route('/eliminar/<int:idUsuario>',methods=['DELETE'])
def eliminar(idUsuario):
    resultado = models.User.eliminar(idUsuario)
    if resultado > 0:
        return {'success': True}, 200
    else:
        return {'success': False}, 500


if __name__== '__main__':
    app.run(debug=True)
