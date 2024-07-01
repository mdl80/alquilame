from app.database import get_db

class User:
    
    def __init__(self, idUsuario=None, nombre_apellido=None, DNI=None, direccion=None, codigo_postal=None, password=None, razon_social=None, matricula=None, idRol=None):
        self.idUsuario = idUsuario
        self.nombre_apellido = nombre_apellido
        self.DNI = DNI
        self.direccion = direccion
        self.codigo_postal = codigo_postal
        self.password = password
        self.razon_social = razon_social
        self.matricula = matricula
        self.idRol = idRol
        
    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.idUsuario:
            cursor.execute("""UPDATE users SET nombre_apellido = %s, DNI = %s, direccion = %s, codigo_postal = %s, password = %s, razon_social = %s, matricula = %s, idRol = %s 
                WHERE idUsuario = %s""",
                (self.nombre_apellido, self.DNI, self.direccion, self.codigo_postal, self.password, self.razon_social, self.matricula, self.idRol))
        else:
            cursor.execute("""
                INSERT INTO Usuario (nombre_apellido, DNI, direccion, codigo_postal, password, razon_social, matricula, irRol) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)""", 
                (self.nombre_apellido, self.DNI, self.direccion, self.codigo_postal, self.password, self.razon_social, self.matricula, self.idRol))
            self.idUsuario = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM users WHERE idUsuario = %s", (self.idUsuario,))
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        cursor.close()
        return users

    @staticmethod
    def get_by_id(idUsuario):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE idUsuario = %s", (idUsuario,))
        user = cursor.fetchone()
        cursor.close()
        return user

    @staticmethod
    def get_by_name(name):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE nombre_apellido = %s", (name,))
        user = cursor.fetchone()
        cursor.close()
        return user

    @staticmethod
    def get_by_matricula(matricula):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE matricula = %s", (matricula,))
        user = cursor.fetchone()
        cursor.close()
        return user




        
        