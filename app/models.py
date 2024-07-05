import sqlite3
from flask import jsonify
from app.database import get_db

class User:
    
    def __init__(self,nombre_apellido, DNI, direccion, codigo_postal,email, password, razon_social='', matricula='', idRol=None):
        self.idUsuario = None
        self.nombre_apellido = nombre_apellido
        self.DNI = DNI
        self.direccion = direccion
        self.codigo_postal = codigo_postal
        self.email = email
        self.password = password
        self.razon_social = razon_social
        self.matricula = matricula
        self.idRol = idRol

    
    @staticmethod
    def save(usuario):
        db = get_db()
        cursor = db.cursor()

        try:
            cursor.execute("""
                        INSERT INTO Usuario (nombre_apellido, DNI, direccion, codigo_postal, 
                        email, password, razon_social, matricula, idRol) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                        (usuario.get('nombre_apellido'), usuario.get('DNI'), usuario.get('direccion'), usuario.get('codigo_postal'), 
                        usuario.get('email'), usuario.get('password'), usuario.get('razon_social'), usuario.get('matricula'), usuario.get('idRol')))
        
            db.commit()
            resultado = cursor.lastrowid
            print(f"ID del usuario insertado: {resultado}")  # Añadir para depuración
        except sqlite3.Error as e:
            print(f"Error al insertar usuario en la base de datos: {e}")
            resultado = None
        finally:
            cursor.close()

        return resultado

    @staticmethod
    def update(data):
        db = get_db()
        cursor = db.cursor()

        try:
            cursor.execute("""
                UPDATE Usuario 
                SET nombre_apellido = ?, DNI = ?, direccion = ?, codigo_postal = ?,
                    email = ?, razon_social = ?, matricula = ?
                WHERE idUsuario = ?""",
            (data.get('nombreUsuario'), data.get('DNI'), data.get('direccion'),
            data.get('codigoPostal'), data.get('email'), data.get('razonSocial'),
            data.get('matricula'), data.get('idUsuario')))
            db.commit()
            resultado = cursor.rowcount 
            print(f"Número de filas actualizadas: {resultado}")  # Añadir para depuración
        except sqlite3.Error as e:
            print(f"Error al actualizar el usuario en la base de datos: {e}")
            resultado = None
        finally:
            cursor.close()

        return resultado
    @staticmethod
    def eliminar(idUsuario):
        print('el id a elimnar es ' + str(idUsuario))
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM Usuario WHERE idUsuario = ?", (idUsuario,))
        resultado = cursor.rowcount
        print('la cantidad de filas afectas es : ' + str(resultado))
        db.commit()
        cursor.close()
        print('el resultado es:' + str(resultado))
        return resultado

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM Usuario WHERE idUsuario = ?", (self.idUsuario,))
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Usuario")
        users = cursor.fetchall()
        cursor.close()
        return users

    @staticmethod
    def get_by_id(idUsuario):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Usuario WHERE idUsuario = ?", (idUsuario,))
        user = cursor.fetchone()
        cursor.close()
        return user

    @staticmethod
    def get_by_username(username):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Usuario WHERE username = %s", (username,))
        user = cursor.fetchone()
        cursor.close()
        return user

    @staticmethod
    def get_by_email(email):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM Usuario WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()
        return user

    @staticmethod
    def authLoguin(email, password):
        db = get_db()
        cursor = db.cursor()
        cursor.execute('SELECT idUsuario FROM Usuario WHERE email=? AND password=?', (email, password))
        result = cursor.fetchone()
        cursor.close()
        if result:
            idUsuario = result[0]
            return idUsuario
        else:
            return -1
            