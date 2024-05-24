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
