document.addEventListener("DOMContentLoaded", function () {  // CUANDO CARGA EL DOCUMENTO EJECUTA LO SIGUIENTE:
    document.getElementById("email").value = JSON.parse(localStorage.getItem("nombreUsuario")) // CARGA EL MAIL QUE SE INGRESA EN EL LOGIN, CON .PARSE ME LO MUESTRA EN FORMATO JSON
    if (JSON.parse(localStorage.getItem("datosUsuario"))) { // TRAEMOS LOS DATOS DEL USUARIO DEL LOCAL STORAGE Y PREGUNTAMOS SI TIENE DATOS (O SI EXISTEN) Y SI EXISTEN, CARGAMOS DATOS DEL USUARIO CON LA FUNCION mostrarDatosUsuario()
        mostrarDatosUsuario()
    }
})


function validar() { // def. funcion que va a validar los campos
    let primerNombre = document.getElementById("primerNombre") // obtenemos todos los valores de los campos
    let segundoNombre = document.getElementById("segundoNombre")
    let primerApellido = document.getElementById("primerApellido")
    let segundoApellido = document.getElementById("segundoApellido")
    let telefonoContacto = document.getElementById("telefonoContacto")
    let email = document.getElementById("email")
    let estadoValidacion = true // def. el valor del estadoValidacion (que inicia con true) que lo que retorna después de la validación

    if (!primerNombre.value) { // validación primerNombre
        document.getElementById("primerNombre").classList.add("is-invalid");
        estadoValidacion = false
    }
    if (!primerApellido.value) { // validacion primerApellido
        document.getElementById("primerApellido").classList.add("is-invalid");
        estadoValidacion = false
    }
    if (!email.value) { // validacion email
        document.getElementById("email").classList.add("is-invalid");
        estadoValidacion = false
    }

// FEEDBACK VERDE CUANDO LO RELLENAN

    if (segundoNombre.value) {
        document.getElementById("segundoNombre").classList.add("is-valid");
    }
    if (segundoApellido.value) {
        document.getElementById("segundoApellido").classList.add("is-valid");
    }
    if (telefonoContacto.value) {
        document.getElementById("telefonoContacto").classList.add("is-valid");
    }

    return estadoValidacion

};

function guardar() { // def. funcion "guardar()" 
    if (!validar()) { // llamamos a funcion validar que nos devuelve el estado de la validación, si devuelve "false" nos muestra el alert incorrecto
        alert("Campos incompletos")
        return // cortamos ejecucion con el "return"
    }
    document.getElementById("primerNombre").classList.add("is-valid"); // agregamos el feedback para el nombre, apellido y mail (campos obligatiorios)
    document.getElementById("primerApellido").classList.add("is-valid");
    document.getElementById("email").classList.add("is-valid");

    let datosUsuario = { // creamos un objeto con los datos ingresados por el usuario en el formulario
        primerNombre: document.getElementById("primerNombre").value,
        segundoNombre: document.getElementById("segundoNombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        email: document.getElementById("email").value,
        telefonoContacto: document.getElementById("telefonoContacto").value,
    }
    console.log(datosUsuario, "objeto creado") // ESTE CONSOLE LOG VERIFICA EL OBJETO QUE CREAMOS CON LOS DATOS DEL USUARIO
    localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario)); // Guardamos el objeto en el localStorage

}

function mostrarDatosUsuario() { // def. funcion que va a completar el formulario con los valores que tenemos guardados en el localStorage
    let datosUsuario = JSON.parse(localStorage.getItem("datosUsuario")) // traemos el objeto creado anteriormente y lo guardo en "datosUsuario"
    document.getElementById("primerNombre").value = datosUsuario.primerNombre; // a cada input le asigno un valor que esta previamente definido en datosUsuario. Utilizando la notación "." selecciono el valor adecuado
    document.getElementById("segundoNombre").value = datosUsuario.segundoNombre;
    document.getElementById("primerApellido").value = datosUsuario.primerApellido;
    document.getElementById("segundoApellido").value = datosUsuario.segundoApellido;
    document.getElementById("email").value = datosUsuario.email;
    document.getElementById("telefonoContacto").value = datosUsuario.telefonoContacto;
}

