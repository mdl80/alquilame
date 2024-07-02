import sqlite3

from Models.Inquilino import Inquilino
from Models.Locatario import Locatario

class Connection:
    
    def __init__(self) -> None:
        self.ruta = './database/alquilame2.db'
        self.cursor = None
        self.conexion = None
        
    def conectar(self):
        self.conexion = sqlite3.connect(self.ruta)
        self.cursor = self.conexion.cursor()
        
    def desconectar(self):
        if self.conexion:
            self.conexion.close()
    
    def mostrarUsuarios(self):
        self.conectar()
        query = 'SELECT * FROM Usuario'
        resultado = self.cursor.execute(query)
        usuarios = resultado.fetchall
        self.desconectar()
        return usuarios
    
    
    def guardarUsuario(self, usuario):
        self.conectar()
        query = 'INSERT INTO Usuario (nombre_apellido, DNI, direccion, codigo_postal, Password, razon_social, matricula,idRol) VALUES (?, ?, ? , ?, ?, ?, ?, ?))'
        idRol = None
        if(isinstance(usuario,Inquilino)):
            idRol=1
        if(isinstance(usuario,Locatario)):
            idRol = 2
        valores = ( usuario.nombre_apellido, usuario.DNI, usuario.direccion, usuario.codigo_postal, 
                            usuario.password, usuario.razon_social, usuario.matricula,idRol)  
        self.cursor.execute(query,valores)
        self.conexion.commit()
        self.desconectar()
            
    
    def existeByDNI(self, DNI):
        self.conectar()
        query = "SELECT COUNT(DNI) FROM Usuario WHERE DNI=?"
        resultado = self.cursor.execute(query, (DNI,)).fetchone()[0]
        self.desconectar()
        return resultado == 0
