
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

    // Eliminar clases de error anteriores
    document.querySelectorAll('.error').forEach(element => {
        element.classList.remove('error');
    });

    // Comprobamos si alguno está vacío
    if (!nombre || !email || !telefono || !mensaje || !contacto || !servicio) {
        // Marcamos con error los vacíos
        if (!nombre) document.querySelector('#nombre_contacto').classList.add('error');
        if (!email) document.querySelector('#email_contacto').classList.add('error');
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
        console.log("llego a todo esta bien");
        alert("Formulario enviado con exito");
    }
}
