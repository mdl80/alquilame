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