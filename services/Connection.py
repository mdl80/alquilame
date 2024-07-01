import sqlite3

class Connection:
    
    def __init__(self) -> None:
        self.ruta = './database/alquilame.db'
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
    
    
    
    
    