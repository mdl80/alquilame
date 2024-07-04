from flask import jsonify
from app.database import get_db

class User:
    
    def __init__(self, idUsuario=None, nombre_apellido=None, DNI=None, direccion=None, codigo_postal=None,email=None, password=None, razon_social=None, matricula=None, idRol=None):
        self.idUsuario = idUsuario
        self.nombre_apellido = nombre_apellido
        self.DNI = DNI
        self.direccion = direccion
        self.codigo_postal = codigo_postal
        self.email = email
        self.password = password
        self.razon_social = razon_social
        self.matricula = matricula
        self.idRol = idRol
        
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.idUsuario:
            cursor.execute("""UPDATE Usuario SET nombre_apellido = %s, DNI = %s, direccion = %s, codigo_postal = %s, email = %s, password = %s, razon_social = %s, matricula = %s, idRol = %s 
                WHERE idUsuario = %s""",
                (self.nombre_apellido, self.DNI, self.direccion, self.codigo_postal, self.email, self.password, self.razon_social, self.matricula, self.idRol))
        else:
            cursor.execute("""
                INSERT INTO Usuario (nombre_apellido, DNI, direccion, codigo_postal, password, razon_social, matricula, irRol) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""", 
                (self.nombre_apellido, self.DNI, self.direccion, self.codigo_postal, self.email, self.password, self.razon_social, self.matricula, self.idRol))
            self.idUsuario = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM Usuario WHERE idUsuario = %s", (self.idUsuario,))
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
        cursor.execute("SELECT * FROM Usuario WHERE idUsuario = %s", (idUsuario,))
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
        if result:
            idUsuario = result[0]
            return idUsuario
        else:
            return -1
            