# routes/home.py
from flask import render_template

def home(app):
    @app.route('/')
    def home_route():
        return render_template('index.html')