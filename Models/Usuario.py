from abc import ABC, abstractmethod
class  Usuario(ABC):
    
    def __init__(self, nombre_apellido, direccion, codigo_postal, password) -> None:
        self.nombre_apellido = nombre_apellido
        self.direccion = direccion
        self.codigo_postal = codigo_postal
        self.password = password

    
    