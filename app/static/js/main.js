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

        let name, dni, address, CPostal, email, password, password2, razon_Social, matricula;

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
            name = document.querySelector('#name_usuario').value;
            dni = document.querySelector('#dni_usuario').value;
            address = document.querySelector('#address_usuario').value;
            CPostal = document.querySelector('#CPostal_usuario').value;
            email = document.querySelector('#email_usuario').value;
            password = document.querySelector('#password_usuario').value;
            password2 = document.querySelector('#password2_usuario').value;
        }

        if (tipoUsuario === 'Locatario') {
            name = document.querySelector('#name_prop').value;
            address = document.querySelector('#address_prop').value;
            CPostal = document.querySelector('#CPostal_prop').value;
            email = document.querySelector('#email_prop').value;
            razon_Social = document.querySelector('#razon_social').value;
            matricula = document.querySelector('#matricula_prop').value;
            password = document.querySelector('#password_prop').value;
            password2 = document.querySelector('#password2_prop').value;
        }

        // crear usuario, 
        let usuario = crearUsuario(tipoUsuario, name, dni, address, CPostal, email, password, razon_Social, matricula);

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
            // se crea un array de objetos
            const Users = JSON.parse(localStorage.getItem('Users')) || [];
            const isUserRegistered = Users.find(user => user.email === email);
            if (isUserRegistered) {
                return alert('El usuario ya existe');
            }

            Users.push(usuario);
            localStorage.setItem('Users', JSON.stringify(Users));
            alert('Registro Exitoso');
            window.location.href = 'inicio_sesion.html';
        } else {
            alert("Para continuar el registro debe completar todos los campos obligatorios");
        }
    });
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
 * Esta funcion devuelve un usuario,posee un atributo repetido para validacion posterior (Password)
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
function crearUsuario(tipoUsuario, name, dni, address, CPostal, email, password, razon_Social, matricula) {
    let user = null;
    if (tipoUsuario === 'Inquilino') {
        razon_Social = ''
        matricula = ''
        user = {
            name,
            dni,
            address,
            CPostal,
            email,
            password,
            razon_Social,
            matricula
        };
    } else if (tipoUsuario === 'Locatario') {
        user = {
            name,
            address,
            CPostal,
            email,
            razon_Social,
            matricula,
            password,
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
    let tag;
    for (const atributo in usuario) {
        if (Object.hasOwnProperty.call(usuario, atributo)) {
            const valor = usuario[atributo]
            if (tipoUsuario === 'Inquilino' && (atributo != 'razon_social' || atributo != 'matricula') && (valor === null || valor === '')) {
                validado = false;
                return validado;
            } else {
                if ((atributo != 'dni') && (valor === null || valor === '')) {
                    validado = false;
                    return validado;
                }
            }
        }
    }
    return validado;
}



/**
 * Esta funcion marca los errores en el formulario dependiendo de sus valores y devuelve True si es validado
 * o False en caso contrario
 * @param {Formulario} formulario 
 * @param {String} tipoUsuario 
 * @returns Boolean
 */
function marcarError(formulario, tipoUsuario) {
    let name, dni, address, CPostal, email, password, password2, razon_Social, matricula;

    if (tipoUsuario === 'Inquilino') {
        name = document.querySelector('#name_usuario').value;
        dni = document.querySelector('#dni_usuario').value;
        address = document.querySelector('#address_usuario').value;
        CPostal = document.querySelector('#CPostal_usuario').value;
        email = document.querySelector('#email_usuario').value;
        password = document.querySelector('#password_usuario').value;
        password2 = document.querySelector('#password2_usuario');

        if (!name || !dni || !address || !CPostal || !email || !password || !password2) {
            // Marcar los campos que faltan
            if (!name) document.querySelector('#name_usuario').classList.add('error');
            if (!dni) document.querySelector('#dni_usuario').classList.add('error');
            if (!address) document.querySelector('#address_usuario').classList.add('error');
            if (!CPostal) document.querySelector('#CPostal_usuario').classList.add('error');
            if (!email) document.querySelector('#email_usuario').classList.add('error');
            if (!password) document.querySelector('#password_usuario').classList.add('error');
            if (!password2) document.querySelector('#password2_usuario').classList.add('error');
            return false;
        }

    } else if (tipoUsuario === 'Locatario') {
        name = document.querySelector('#name_prop').value;
        address = document.querySelector('#address_prop').value;
        CPostal = document.querySelector('#CPostal_prop').value;
        email = document.querySelector('#email_prop').value;
        razon_Social = document.querySelector('#razon_social').value;
        matricula = document.querySelector('#matricula_prop').value;
        password = document.querySelector('#password_prop').value;
        password2 = document.querySelector('#password2_prop').value;

        if (!name || !address || !CPostal || !email || !razon_Social || !matricula || !password || !password2) {
            // Marcar los campos que faltan
            if (!name) document.querySelector('#name_prop').classList.add('error');
            if (!address) document.querySelector('#address_prop').classList.add('error');
            if (!CPostal) document.querySelector('#CPostal_prop').classList.add('error');
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
if (!(form_usuario === null && form_prop === null)) {
    // llamando a la función registrarUsuario, activa el listener en el form cliente
    registrarUsuario(form_usuario, 'Inquilino');
    // llamando a la función registrarUsuario, activa el listener en el form propietario
    registrarUsuario(form_prop, 'Locatario');
}

function nuevoUsuario(usuario) {

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

/** otras funciones server-side */
