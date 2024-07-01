from flask import Flask, render_template

from services.Connection import Connection
from routes.home import home

app = Flask(__name__,template_folder='app/templates')

"""conexion = Connection()"""

home(app)

if __name__ == '__main__':
    app.run(debug=True)