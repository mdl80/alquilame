from flask import jsonify, request
from app.models import User

def index():
    return({'Message': 'Hola Mundo desde API Alquilame'})

def create_user():
    data = request.json
    new_user = User(idUsuario=data['idUsuario'], nombre_apellido=['nombre_apellido'], DNI=['DNI'], direccion=['direccion'], codigo_postal=['codigo_postal'], email=['email'], password=['password'], razon_social=['razon_social'], matricula=['matricula'], idRol=['idRol'])
    new_user.save()
    return jsonify({'mesagge': 'Usuario creado correctamente'}), 201

#Generar un Json que registra toda la base de datos.
def get_all_users():
    users = User.get_all()
    return jsonify([User.serialize() for User in users])

def get_user(idUsuario):
    user = User.get_by_id(idUsuario)
    if not user:
        return jsonify({'message': 'Usuario no registrado'}), 404
    return jsonify(user.serialize())

def update_user(idUsuario):
    user = User.get_by_id(idUsuario)
    if not user:
        return jsonify({'message': 'Usuario no encontrado' }), 404
    data = request.json
    user.nombre_apellido = data['nombre_apellido']
    user.DNI = data['DNI']
    user.direccion = data['direccion']
    user.codigo_postal = data['codigo_postal']
    user.email = data['email']
    user.password = data['password']
    user.razon_social = data['razon_social']
    user.matricula = data['matricula']
    user.idRol = data['idRol']
    user.save()
    return jsonify({'message': 'Usuario actualizado correctamente'})

def delete_usuario(idUsuario):
    user = User.get_by_id(idUsuario)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'})
    user.delete()
    return jsonify({'message': 'Usuario borrado correctamente'})


