# routes/home.py
from flask import render_template, template_rendered
from flask import Flask


class Routes:
    def __init__(self, app:Flask) -> None:
        self.app = app
        self.registerRoutes(app)

    def registerRoutes(self):
        @self.app.route('/')
        def home():
            return render_template('/index.html')