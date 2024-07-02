# routes/home.py
from flask import render_template, template_rendered
from flask import Flask


class Routes:
    def __init__(self, app:Flask) -> None:
        self.app = app
        self.registerRoutes()

    def registerRoutes(self):
        @self.app.route('/')
        def home():
            return render_template('/index.html')

        @self.app.route('/nosotros')
        def nosotros():
            return render_template('/nosotros.html')

        @self.app.route('/contacto')
        def contacto():
            return render_template('/contacto.html')

        @self.app.route('/registro')
        def registro():
            return render_template('/registro.html')

        @self.app.route('/sesion')
        def sesion():
            return render_template('/inicio_sesion.html')

        @self.app.route('/sesion2')
        def sesion2():
            return render_template('/inicio_sesion_propietario.html')

        @self.app.route('/register', methods=['POST'])
        def registroUsuario():
            return registroUsuario(request)