
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
document.querySelector(".button_publicar a").addEventListener('click', validar);
