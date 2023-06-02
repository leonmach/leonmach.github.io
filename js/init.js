const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
let nombreUsuario = localStorage.getItem("nombreUsuario");

validarUsuario()

function validarUsuario () {
  if (!nombreUsuario) {
    location.href = "index.html";
  }
}

let showSpinner = function(){ 
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){ 
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

// DESLOGUEARSE

function cerrarSesion() {
  localStorage.removeItem("nombreUsuario");
  localStorage.removeItem("datosUsuario")
}


// MOSTRAR USUARIO 



function mostrarUsuario() { // creo funcion para mostrar el usuario
  localStorage.getItem("nombreUsuario"); // obtengo la información del usuario con "getItem" del localStorage
  nombreUsuario_json = localStorage.getItem("nombreUsuario"); // obtengo la información de la key "nombreUsuario" y me lo devuelve en JSON
  nombreUsuario = JSON.parse(nombreUsuario_json); // la información que me devuelve al estar en JSON preciso transformarlo a un string, por eso uso ".parse()"
  menu = `
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    ${nombreUsuario}
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="index.html" onclick="cerrarSesion()">Cerrar sesión</a></li>
  </ul>
</div>
  `

  document.getElementById("nombreUsuario").innerHTML = menu;
}

// Usamos bootstrap para hacer un menu "dropdown"


mostrarUsuario() // llamo a la funcion
