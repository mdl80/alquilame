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
//document.querySelector(".button_publicar a").addEventListener('click', validar);
//cambiar lo de arriba para que se pueda mantener el js

//Registro js

const  usuario_form = document.querySelector('.usuario_form')
usuario_form.addEventListener('submit', (e)=>{
    e.preventDefault()
    //tomamos los 3 campos del formulario con el .value
    const name_usuario = document.querySelector('#name_usuario').value
    const dni_usuario = document.querySelector('#dni_usuario').value
    const address_usuario = document.querySelector('#address_usuario').value
    const CPostal_usuario = document.querySelector('#CPostal_usuario').value
    const email_usuario = document.querySelector('#email_usuario').value
    const password_usuario = document.querySelector('#password_usuario').value
    const password2_usuario = document.querySelector('#password2_usuario').value
    
    // Validación de contraseñas
    if (password_usuario !== password2_usuario) {
        return alert('Las contraseñas no coinciden');
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_usuario)) {
        return alert('Por favor, ingrese un correo electrónico válido');
    }
    //se crea un array de objetos
    //chequear que el mail que ingresa el usuario no este registrado si esta variable tiene un valor valido, esta registrado
    const Users = JSON.parse(localStorage.getItem('Users')) || []
    const isUserRegistered = Users.find(user => user.email === email_usuario)
    if(isUserRegistered) {
        return alert('El usario ya existe')
    } 
    Users.push({name: name_usuario, dni:dni_usuario, address: address_usuario , CPostal: CPostal_usuario,  email: email_usuario, password: password_usuario, password2: password2_usuario})
    localStorage.setItem('Users',JSON.stringify(Users))
    alert('Registrado Exitoso')
    window.location.href= 'inicio_sesion.html'
})

//Scripts js

const datos = {
    nombre_contacto:'',
    email_contacto: '',
    phone_contacto: '',
    direccion_contacto: '',
    comentarios_contacto:''

}

document.getElementById('login_form')
    addEventListener('submit', function(e) {
        e.preventDefault(); // Evita que el formulario se envíe
    
        // Obtén el valor del campo de texto
     
    
        // Define la expresión regular para validar el texto (al menos 3 caracteres alfabéticos)
       
    
        // Valida el texto con la expresión regular
     
    });

// submit
const formulario = document.querySelector('.login_form');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(e);

    console.log('Di click y la página ya no recarga');

    console.log(datos);
    var texto = document.getElementById('nombre_contacto').value;
    var expresionRegular = /^[a-zA-Z]{3,}$/;
       if (expresionRegular.test(texto)) {
            // Si es válido, envía el formulario
            
            alert('Texto válido: ' + texto);
            
           
            // this.submit(); // Puedes enviar el formulario si lo deseas
        } else {
            // Si no es válido, muestra un mensaje de error
            
            alert('Por favor, ingresa al menos 3 letras del alfabeto en el campo Nombre.');
            return;
        }
 // Validar el Formulario...

 const { nombre_contacto, email_contacto, phone_contacto, direccion_contacto, comentarios_contacto} = datos;

 if(nombre_contacto === '' || email_contacto === '' || phone_contacto=== '' || direccion_contacto=== '') {
     //console.log('Al menos un campo esta vacio');
     mostrarError('Todos los campos son obligatorios');
     return; // Detiene la ejecución de esta función
 }

// console.log('Todo bien...')

 mostrarMensaje('Mensaje enviado correctamente');
});



//muestra error en pantalla
function mostrarError(mensaje) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('error');

    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}

function mostrarMensaje(mensaje) {
    const alerta = document.createElement('p');
    alerta.textContent = mensaje;
    alerta.classList.add('correcto');
    formulario.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
}
// Eventos de los Inputs...
const nombre_ = document.querySelector('#nombre_contacto');
const email = document.querySelector('#email_contacto');
const phone = document.querySelector('#phone_contacto');
const direccion = document.querySelector('#direccion_contacto');
const comentario = document.querySelector('#comentario_contacto');


nombre_contacto.addEventListener('input', leerTexto);
email_contacto.addEventListener('input', leerTexto);
phone.addEventListener('input', leerTexto);
direccion_contacto.addEventListener('input', leerTexto);
comentarios_contacto.addEventListener('input', leerTexto);

function leerTexto(e) {
    // console.log(e);
    // console.log(e.target.value);

    datos[e.target.id] = e.target.value;

    console.log(datos);
}

