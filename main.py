from flask import Flask, render_template

from services.Connection import Connection
from routes.Routes import Routes

app = Flask(__name__,template_folder='app/templates',static_folder='app/static')

"""conexion = Connection()"""
home_routes = Routes(app)

if __name__ == '__main__':
    app.run(debug=True)