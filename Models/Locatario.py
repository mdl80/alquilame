
from Models.Usuario import Usuario


class Locatario(Usuario):
    def __init__(self, nombre_apellido, DNI, direccion, codigo_postal, password, razon_social,matricula ) -> None:
        super().__init__(nombre_apellido, direccion, codigo_postal, password)
        self.DNI = ''
        self.rason_social = ''
        self.matricula = ''

    @property
    def nombre_apellido(self):
        return self.nombre_apellido

    @property
    def DNI(self):
        return self.DNI

    @property
    def direccion(self):
        return self.direccion

    @property
    def codigo_postal(self):
        return self.codigo_postal

    @property
    def password(self):
        return self.password

    @property
    def razon_social(self):
        return self.razon_social

    @property
    def matricula(self):
        return self.matricula