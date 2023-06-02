document.getElementById("botonIngresar").addEventListener("click", function validar() {
    let mail = document.getElementById("email").value;
    let password = document.getElementById("contraseña").value;
    let seCumple = true;

    if (mail == "") {
        seCumple = false;
        alert("Falta el e-mail")
    }

    if (password == "") {
        seCumple = false;
        alert("Falta la password")
    }

    if (seCumple) {
        window.location.href = "inicio.html"
    }
})

document.getElementById("botonIngresar").addEventListener("click", function guardarUsuario() { // creo funcion
    // creo una variable para guardar el email del input "email"
    let nombreUsuario = document.getElementById("email").value;

    let nombreUsuario_json = JSON.stringify(nombreUsuario); //lo transformo en JSON usando el método "stringify" que recibe un objeto y
    // lo devuelve como un JSON

    localStorage.setItem("nombreUsuario", nombreUsuario_json); // utilizo metodo setItem del objeto localStorage para almacenar el JSON localmente. Recibe 2 parametros:
    // el primero será un string (que será la key) y el segundo será el contenido (nombreUsuario_json)

})
