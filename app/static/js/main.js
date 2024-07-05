//MEnu hamburguesa

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


// Login js


//funcion que trael el formulario del DOM
function obtenerFormulario() {
    return document.querySelector(".login_form");
}

//esta funcion crea y devuelve un usuario a partir de un formulario
function createUser(formulario) {
    let user = {
        email: formulario.querySelector("#email").value,
        razonSocial: formulario.querySelector("#razon_social_p").value,
        matricula: formulario.querySelector("#matricula_usuario_p").value,
        password: formulario.querySelector("#password").value
    }
    return user;
}
//esta funcion valida un usuario y devuelve True si es validado, False en caso contrario
function validarUsuario(user) {
    let validado = true;
    validado = (user.email.trim() === "admin@grupo4.com" &&
        user.matricula.trim() === "1111" &&
        user.razonSocial.trim() === "2222" &&
        user.password.trim() === "admin");
    console.log("Usuario validado?:" + validado);
    return validado;
}
//funcion que advierte al usuario que no ha sido validado
function mostrarError() {
    let formulario = obtenerFormulario();
    const alerta = document.createElement('p');
    alerta.textContent = "Los datos introducidos son incorrectos o no existe el usuario";
    alerta.classList.add('error');

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 5000);
}
//funcion que lleva al html si el usuario es validado,recibe un usuario por parametro
function abrirPropiedad(user) {
    if (validarUsuario(user)) {
        window.location.href = '/html/propiedades.html';
    } else {
        mostrarError();
    }
}

//funcion que desempeña la tarea de validacion
function validar() {
    let formulario = obtenerFormulario();
    let user = createUser(formulario);
    abrirPropiedad(user);
}
//asignando un listener al boton submit del fomulario
if (document.querySelector(".button_publicar a") !== null) {
    document.querySelector(".button_publicar a").addEventListener('click', validar)
};
//cambiar lo de arriba para que se pueda mantener el js


/********registro*****************/
// obteniendo los formularios de registro.html
const form_usuario = document.querySelector('.usuario_form');
const form_prop = document.querySelector('.prop_form');

// función para registrar usuario dependiendo de su tipo

/**
 * Esta funcion registra un  usuario, dependiendo de los campos completados por el usuario
 * y el boton que utilizo para el registro
 * @param {formulario} formulario - El formulario que va a recibir la funcion
 * @param {String} tipoUsuario - El tipo de cliente , Inquilino o Propietario
 */
function registrarUsuario(formulario, tipoUsuario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let nombre_usuario, DNI, direccion, codigo_postal, email, password, password2, razon_Social, matricula, idRol;

        // Eliminar clases de error anteriores
        document.querySelectorAll('.error').forEach(element => {
            element.classList.remove('error');
        });

        if (!marcarError(formulario, tipoUsuario)) {
            alert("Para continuar el registro debe completar todos los campos obligatorios");
            return;
        }
        //se podria sacar a una funcion, guarda los datos segun tipo de usuario 
        //los datos los saca del formulario segun su tipo de usuario
        if (tipoUsuario === 'Inquilino') {
            nombre_usuario = document.querySelector('#name_usuario').value;
            DNI = document.querySelector('#dni_usuario').value;
            direccion = document.querySelector('#address_usuario').value;
            CPcodifo_postal = document.querySelector('#CPostal_usuario').value;
            email = document.querySelector('#email_usuario').value;
            password = document.querySelector('#password_usuario').value;
            password2 = document.querySelector('#password2_usuario').value;
            idRol = 1;
        }

        if (tipoUsuario === 'Locatario') {
            nombre_usuario = document.querySelector('#name_prop').value;
            direccion = document.querySelector('#address_prop').value;
            codigo_postal = document.querySelector('#CPostal_prop').value;
            email = document.querySelector('#email_prop').value;
            razon_Social = document.querySelector('#razon_social').value;
            matricula = document.querySelector('#matricula_prop').value;
            password = document.querySelector('#password_prop').value;
            password2 = document.querySelector('#password2_prop').value;
            idRol = 2;
        }

        // vamos a crear un diccionario llamado usuario , el tipo de usuario para asignar el idRol 
        let usuario = crearUsuario(tipoUsuario, nombre_usuario, DNI, direccion, codigo_postal, email, password, razon_Social, matricula);
        //enviar(empaquetar(usuario))
        // validar Usuario
        let validado = validarUsuarios(usuario, tipoUsuario);

        if (validado) {
            // Validación de contraseñas
            if (!validarContraseña(password, password2)) {
                return alert('Las contraseñas no coinciden');
            }
            // validación de correo electrónico
            if (!validarMail(email)) {
                return alert('Por favor, ingrese un correo electrónico válido');
            }
            //si fue validado y no hubo errores empaqueto y envio
            //debo hacer fetch para guardar la redireccion la hago dependiendo la respuesta
            console.log('entrando a guardar')
            guardar(usuario)
            console.log('salida despues de mandar a guardar')
            limpiarFormularios()
            redireccion(tipoUsuario)
        } else {
            alert("Para continuar el registro debe completar todos los campos obligatorios");
        }
    });
}

function redireccion(tipoUsuario) {
    if (tipoUsuario === 'Inquilino') {
        window.location.href = '/sesion';//va a la pagina de perfil no a la de inicio*/
    }
    if (tipoUsuario === 'Locatario') {
        window.location.href = '/sesion2';//va a la pagina de perfil no a la de inicio*/
    }
}
function limpiarFormularios() {

    form_prop.reset()
    form_usuario.reset()
}
// función que devuelve true si la contraseña es validada, false en caso contrario 
/**
 * Esta funcion valida si dos campos contienen la misma contraseña,devuelve True en el caso de que 
 * que se asi, False en caso de que sean distintas
 * @param {String} pass1 
 * @param {String} pass2 
 * @returns Boolean
 */
function validarContraseña(pass1, pass2) {
    return (pass1 === pass2);
}

// función que devuelve true si el mail es validado, false en caso contrario
/**
 * Esta funcion valida si es valida la cuenta de correo ingresada, en ese caso devuelte True
 * en caso contrario False
 * @param {String} mail 
 * @returns  Boolean
 */
function validarMail(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(mail);
}

// función para crear un usuario 
/**
 * Esta funcion devuelve un diccionario,posee un atributo repetido para validacion posterior (Password)
 * se puede mejorar
 * @param {String} tipoUsuario - identificador de tipo de usuario
 * @param {*} name - nombre y apellido del usuario
 * @param {*} dni - DNI del usuario
 * @param {*} address -direccion del usuario
 * @param {*} CPostal - codigo postal del usuario
 * @param {*} email - correo electronico del usuariop
 * @param {*} password - contraseña del usuario
 * @param {*} password2 - contraseña del usuario para verificacion 
 * @param {*} razon_Social - razon social (solo para Locatario)
 * @param {*} matricula - matricula (solo para Locatario)
 * @returns Usuario -el usuario creado
 */

/**
 *  Esta funcion crea un usuario de control dependiendo su tipo
 * @param {*} tipoUsuario 
 * @param {*} name 
 * @param {*} dni 
 * @param {*} address 
 * @param {*} CPostal 
 * @param {*} email 
 * @param {*} password 
 * @param {*} razon_Social 
 * @param {*} matricula 
 * @returns un usuario tipo Inquilino o Locatario
 */
function crearUsuario(tipoUsuario, nombre_apellido, DNI, direccion, codigo_postal, email, password, razon_Social, matricula) {
    let user = null;
    if (tipoUsuario === 'Inquilino') {
        user = {
            nombre_apellido: nombre_apellido,
            DNI: DNI,
            direccion: direccion,
            codigo_postal: codigo_postal,
            email: email,
            password: password,
            razon_social: '',
            matricula: '',
            idRol: 1
        };
    } else if (tipoUsuario === 'Locatario') {
        user = {
            nombre_apellido: nombre_apellido,
            DNI: '',
            direccion: direccion,
            codigo_postal: codigo_postal,
            email: email,
            razon_social: razon_Social,
            matricula: matricula,
            password: password,
            idRol: 2
        };
    }
    return user;
}

// la función devuelve false si un campo es nulo o vacío, true en caso contrario
/**
 * Esta funcion valida si los campos de usuario son correctos para el tipo de usuario, devolviendo
 * Treu en caso de ser validado o False en caso contrario , cuando uno de sus campos es nulo o vacio
 * @param {Usuario} usuario 
 * @returns Boolean
 */
function validarUsuarios(usuario, tipoUsuario) {
    let validado = true;

    for (const atributo in usuario) {
        if (Object.hasOwnProperty.call(usuario, atributo)) {
            const valor = usuario[atributo];
            console.log(`Validando atributo: ${atributo}, valor: '${valor}', tipoUsuario: ${tipoUsuario}`);
            if (tipoUsuario === 'Inquilino') {
                // Si es Inquilino, ignoramos razon_social y matricula
                if ((atributo !== 'razon_social' && atributo !== 'matricula') && (valor === null || valor === '')) {
                    validado = false;
                    break;
                }
            }
            if (tipoUsuario === 'Locador') {
                // Si es Locador, ignoramos dni
                if ((atributo !== 'DNI') && (valor === null || valor === '')) {
                    validado = false;
                    break;
                }
            }
        }
    }
    console.log('Resultado de validado:', validado);
    return validado;
}

/**
 * Esta funcion marca los errores en el formulario dependiendo de sus valores y devuelve True si es validado
 * o False en caso contrario
 * @param {formulario} formulario 
 * @param {String} tipoUsuario 
 * @returns Boolean
 */
function marcarError(formulario, tipoUsuario) {
    let nombre_apellido, DNI, direccion, codigo_postal, email, password, password2, razon_Social, matricula;

    if (tipoUsuario === 'Inquilino') {
        nombre_apellido = document.querySelector('#name_usuario').value;
        DNI = document.querySelector('#dni_usuario').value;
        direccion = document.querySelector('#address_usuario').value;
        codigo_postal = document.querySelector('#CPostal_usuario').value;
        email = document.querySelector('#email_usuario').value;
        password = document.querySelector('#password_usuario').value;
        password2 = document.querySelector('#password2_usuario').value;

        if (!nombre_apellido || !DNI || !direccion || !codigo_postal || !email || !password || !password2) {
            // Marcar los campos que faltan
            if (!nombre_usuario) document.querySelector('#name_usuario').classList.add('error');
            if (!DNI) document.querySelector('#dni_usuario').classList.add('error');
            if (!direccion) document.querySelector('#address_usuario').classList.add('error');
            if (!codigo_postal) document.querySelector('#CPostal_usuario').classList.add('error');
            if (!email) document.querySelector('#email_usuario').classList.add('error');
            if (!password) document.querySelector('#password_usuario').classList.add('error');
            if (!password2) document.querySelector('#password2_usuario').classList.add('error');
            return false;
        }

    } else if (tipoUsuario === 'Locatario') {
        nombre_apellido = document.querySelector('#name_prop').value;
        direccion = document.querySelector('#address_prop').value;
        codigo_postal = document.querySelector('#CPostal_prop').value;
        email = document.querySelector('#email_prop').value;
        razon_Social = document.querySelector('#razon_social').value;
        matricula = document.querySelector('#matricula_prop').value;
        password = document.querySelector('#password_prop').value;
        password2 = document.querySelector('#password2_prop').value;

        if (!nombre_apellido || !direccion || !codigo_postal || !email || !razon_Social || !matricula || !password || !password2) {
            // Marcar los campos que faltan
            if (!nombre_apellido) document.querySelector('#name_prop').classList.add('error');
            if (!direccion) document.querySelector('#address_prop').classList.add('error');
            if (!codigo_postal) document.querySelector('#CPostal_prop').classList.add('error');
            if (!email) document.querySelector('#email_prop').classList.add('error');
            if (!razon_Social) document.querySelector('#razon_social').classList.add('error');
            if (!matricula) document.querySelector('#matricula_prop').classList.add('error');
            if (!password) document.querySelector('#password_prop').classList.add('error');
            if (!password2) document.querySelector('#password2_prop').classList.add('error');
            return false;
        }
    }

    return true;
}

//comprobacion para no meter un listener sobre nulo y llamar a la funcion
if (!(form_usuario === null)) {
    // llamando a la función registrarUsuario, activa el listener en el form cliente
    registrarUsuario(form_usuario, 'Inquilino');
    // llamando a la función registrarUsuario, activa el listener en el form propietario
    if (!(form_prop === null))
        registrarUsuario(form_prop, 'Locatario');
}






/***************Contacto*****************/
//Scripts js
if (document.querySelector('.contact_form') !== null) {
    document.querySelector('.contact_form').addEventListener('submit', function (e) {
        e.preventDefault();
        validarFormulario();
    });

    function validarFormulario() {
        const nombre = document.querySelector('#nombre_contacto').value;
        const email = document.querySelector('#email_contacto').value;
        const telefono = document.querySelector('#phone_contacto').value;
        const mensaje = document.querySelector('#comentarios_contacto').value;
        const contacto = document.querySelector('input[name="contacto"]:checked');
        const servicio = document.querySelector('#motivo').value;
        const formulario = document.querySelector('.contact_form');

        // Eliminar clases de error anteriores
        document.querySelectorAll('.error').forEach(element => {
            element.classList.remove('error');
        });

        // Comprobamos si alguno está vacío
        if (!nombre || (!email || !(validarMail(email))) || !telefono || !mensaje || !contacto || !servicio) {
            // Marcamos con error los vacíos
            if (!nombre) document.querySelector('#nombre_contacto').classList.add('error');
            if (!email || !(validarMail(email))) document.querySelector('#email_contacto').classList.add('error');
            if (!telefono) document.querySelector('#phone_contacto').classList.add('error');
            if (!mensaje) document.querySelector('#comentarios_contacto').classList.add('error');
            if (!contacto) {
                document.querySelectorAll('input[name="contacto"]').forEach(button => {
                    button.nextElementSibling.classList.add('error'); // Marcar el label asociado al radio button
                });
            }
            if (!servicio) document.querySelector('#motivo').classList.add('error');
            alert("Debe completar todos los campos para poder comunicarnos con usted");
        } else {
            console.log('email validado?: ' + validarMail(email) + ' mail: ' + email)
            alert("Formulario enviado con exito!!!!");
            formulario.reset();
        }
    }
}

/**** Login ******/
//obtenemos el formulario
const form_login = document.querySelector('.login_form');
function empaquetar(data) {
    data = JSON.stringify(data)
    return data
}

//activarLoguin agrega un listener
function activarLoguin(formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        if (sessionStorage.getItem('userData')) {
            sessionStorage.removeItem('userData');
        }

        let email = formulario.querySelector('#email').value;
        let password = formulario.querySelector('#password').value;

        let validar = validarMail(email);

        if (validar) {
            console.log('mail validado?:' + validar);
            //creo un objeto con los datos a enviar
            const formData = {
                email: email,
                password: password
            };

            let paquete = empaquetar(formData);

            const opciones = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: paquete
            };

            fetch('/auth', opciones)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    if (data.validado) {

                        idUsuario = data.idUsuario;
                        email = data.email;
                        const userData = {
                            idUsuario: idUsuario,
                            email: email
                        };
                        sessionStorage.setItem('userData', JSON.stringify(userData));
                        window.location.replace('/perfil');
                    } else {
                        alert('Email o contraseñas incorrectos');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocurrió un error al intentar iniciar sesión.');
                });

        } else {
            alert('Ingrese un correo correcto');
        }
    });
}

//si el formulario no esta vacio o nulo, le agrego un listener a traves de activarLoguin
if (form_login) {
    activarLoguin(form_login);
}

function guardar(data){
    fetch('/guardar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.estado >= 1) {
                alert('Usuario Guardado exitosamente.');
                completar(data.usuario); // Actualiza los campos con los datos retornados
                habilitaGuardar(false);
            } else if (data.estado == 0) {
                alert('Error Nada para Guardar.');
            }
        })
}
/***Perfil*****/

const formu_perfil = document.querySelector('.formu-perfil')

function activarPerfil() {
    if (formu_perfil) {
        // Ocultar inicialmente los campos 
        document.getElementById('espacio-DNI').style.display = 'none';
        document.getElementById('espacio-razon_social').style.display = 'none';
        document.getElementById('espacio-matricula').style.display = 'none';

        // Estableciendo banderas de botones
        let bandera_editar = false;
        let bandera_guardar = false;
        let bandera_eliminar = false;

        // Estableciendo los botones
        const boton_editar = document.querySelector('.boton-editar');
        const boton_guardar = document.querySelector('.boton-guardar');
        const boton_eliminar = document.querySelector('.boton-eliminar');

        deshabilitado(true);

        // Trayendo los datos de sessionStorage
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        console.log(sessionStorage.getItem('userData'));
        const id = userData.idUsuario;
        console.log('el id de usuario es :' + id.toString());

        // Verificando si userData tiene los datos que necesitas
        if (id >= 1) {
            // Trayendo al usuario de la DB por su ID
            fetch('/getById', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idUsuario: id })
            })
                .then(response => response.json())
                .then(data => {
                    // Completa y bloquea 
                    completar(data);
                    const idRol = data.idRol;

                    // Mostrar u ocultar campos según el idRol
                    if (idRol == 1) {
                        document.getElementById('espacio-DNI').style.display = 'block';
                    } else if (idRol == 2) {
                        document.getElementById('espacio-razon_social').style.display = 'block';
                        document.getElementById('espacio-matricula').style.display = 'block';
                    }

                    // Asignando un listener al botón editar
                    boton_editar.addEventListener('click', function (event) {
                        event.preventDefault(); // Prevenir el comportamiento por defecto del botón
                        habilitaGuardar(true);
                    });

                    // Asignando un listener al botón guardar
                    boton_guardar.addEventListener('click', function (event) {
                        event.preventDefault(); // Prevenir el comportamiento por defecto del botón
                        actualizarUsuario(data.idUsuario);
                        habilitaGuardar(false);
                    });

                    // Asignando un listener al botón eliminar
                    boton_eliminar.addEventListener('click', function (event) {
                        event.preventDefault(); // Prevenir el comportamiento por defecto del botón
                        eliminarUsuario(id);
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al obtener los datos del usuario.');
                });
        } else {
            alert('ID de usuario no encontrado en sessionStorage');
            window.location.replace('/sesion'); // Redirigir a la página de inicio de sesión si no hay datos en sessionStorage
        }
    }
}



function habilitaGuardar(habilitar) {
    const botonGuardar = document.querySelector('.boton-guardar');
    const botonEditar = document.querySelector('.boton-editar');

    if (habilitar) {
        botonGuardar.style.backgroundColor = '#224886';
        botonGuardar.disabled = false;
        botonEditar.style.backgroundColor = 'gray';
        botonEditar.disabled = true;
        deshabilitado(false);
    } else {
        botonGuardar.style.backgroundColor = 'gray';
        botonGuardar.disabled = true;
        botonEditar.style.backgroundColor = '#224886';
        botonEditar.disabled = false;
        deshabilitado(true);
    }
}

function completar(data) {
    document.getElementById('nombre_usuario').innerText = data.nombreUsuario;
    document.getElementById('direccion2').value = data.direccion;
    document.getElementById('DNI').value = data.DNI;
    document.getElementById('codigo_postal').value = data.codigoPostal;
    document.getElementById('email').value = data.email;
    document.getElementById('razon_social').value = data.razonSocial;
    document.getElementById('matricula').value = data.matricula;

    // Por defecto, guardar deshabilitado
    document.querySelector('.boton-guardar').disabled = true;
    document.querySelector('.boton-guardar').style.backgroundColor = 'gray';
}

function deshabilitado(valor) {
    document.getElementById('nombre_usuario').disabled = valor;
    document.getElementById('direccion2').disabled = valor;
    document.getElementById('DNI').disabled = valor;
    document.getElementById('codigo_postal').disabled = valor;
    document.getElementById('email').disabled = valor;
    document.getElementById('razon_social').disabled = valor;
    document.getElementById('matricula').disabled = valor;
}

function actualizarUsuario(idUsuario) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    console.log(sessionStorage.getItem('userData'));
    const id = userData.idUsuario;
    const data = {
        idUsuario: id,
        nombreUsuario: document.getElementById('nombre_usuario').innerText,
        direccion: document.getElementById('direccion2').value,
        DNI: document.getElementById('DNI').value,
        codigoPostal: document.getElementById('codigo_postal').value,
        email: document.getElementById('email').value,
        razonSocial: document.getElementById('razon_social').value,
        matricula: document.getElementById('matricula').value
    };

    console.log('************');
    console.log(data);
    console.log('************');

    fetch('/actualizar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.estado >= 1) {
                alert('Usuario actualizado exitosamente.');
                completar(data.usuario); // Actualiza los campos con los datos retornados
                habilitaGuardar(false);
            } else if (data.estado == 0) {
                alert('Nada para actualizar.');
            }
        })
    //.catch(error => {
    //    console.error('Error:', error);
    //    alert('Error al actualizar el usuario.');
    //});
}


function eliminarUsuario(idUsuario) {
    fetch(`/eliminar/${idUsuario}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuario eliminado exitosamente.');
            window.location.replace('/sesion'); // Redirigir a la página de inicio de sesión
        } else {
            alert('Error al eliminar el usuario.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al eliminar el usuario.');
    });
}

// Inicializa la funcionalidad de perfil
if (formu_perfil) {
    activarPerfil();
}
