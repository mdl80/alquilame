from services.Connection import Connection


class ControllerRegistro:

    conexion = Connection()
    
    def __init__(self) -> None:
        pass

    def registroUsuario(self,request):
        self.conexion.conectar()
        """codigo para el request"""
        return 

    def actualizarUsuario(self, request):
        return

    def eliminarUsuario(self, request):
        return 

    def mostrarUsuarios(self, request):
        return 