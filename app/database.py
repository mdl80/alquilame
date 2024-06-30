import os
from flask import g
from dotenv import load_dotenv
import sqlite3

#Cargar las variables de entorno desde el archivo .env
load_dotenv()

#Configuracion de la base de datos usando variables de entorno
DATABASE_CONFIG = {
    'database': os.getenv('DB_NAME')
}

#Obtener conexion a la base de datos
def get_db():
    if 'db' not in g:
        g.db =sqlite3.connect(**DATABASE_CONFIG)
    return g.db

#Cerrar conexion a la base de datos
def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()
#Inicializar la aplicacion con el manejo de la DB
def init_app(app):
    app.teardown_appcontext(close_db)