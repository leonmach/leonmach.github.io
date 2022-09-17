          // Esta función hace un pedido al JSON donde se ubica la información de los productos (costo, descripción, etc)
document.addEventListener("DOMContentLoaded", function () {  // Escucha de cuando carga ejecuta una funcion
    let productID = localStorage.getItem("productoID"); // guardo el valor de productoID (previamente guardado en localstorage) en "prouctID" con el let. 
    getJSONData(PRODUCT_INFO_URL + productID + EXT_TYPE).then(resultado => { // concateno la URL de la que tiene que recibir la información
        if (resultado.status === "ok") {
            showProductsInfo(resultado.data); // mi sentencia
            showProductsImages(resultado.data);
          }else{
            alert("No me trae datos JSON") // si no está "ok", aparece un alert avisandome
        }
    })
})


// FUNCIÓN QUE MUESTRA INFORMACIÓN DEL PRODUCTO

function showProductsInfo(product) {  // definimos función "showProductsInfo" que va a recibir "product"
  let templateAuto = ""; // creamos una variable con un string vacío para luego rellenarlo con el código que pondremos en el HTML 


         templateAuto += `
        <h1 class="products-info-titulo">${product.name}</h1>
        <hr>
        <p class="negrita">Precio</p>
        <p> ${product.currency} ${product.cost}</p>
        <br>
        <p class="negrita">Descripción</p>
        <p> ${product.description}</p>
        <br>
        <p class="negrita">Categoría</p>
        <p>${product.category}</p>
        <br>
        <p class="negrita">Cantidad de vendidos</p>
        <p>${product.soldCount}</p>
        <br>
        <p class="negrita">Imágenes ilustrativas</p>

        
        `
        document.getElementById("contenedorInfo").innerHTML = templateAuto; // insertamos al HTML con .innerHTML
}

// FUNCION QUE MUESTRA IMAGENES DEL PRODUCTO

function showProductsImages(product) { // definimos funcion nueva que muestra imagenes
  let templateAuto = "";
  for (let i = 0; i < product.images.length; i++) { // for para que se inserte la cantidad de veces necesarias (segun el largo de product.images)
    let imagen = product.images[i];
    

    templateAuto += `
        <div class="col-md-3 col-sm-6 col-xs-12">
          <img alt="imagen" src="${imagen}"
            class="img-fluid imagenes-tamaño img-thumbnail rounded float-start">
          </a>
        </div>
        `
        document.getElementById("contenedorImagenes").innerHTML = templateAuto; // insertamos con inner.HTML en el div "contenedorImagenes"
  }
}




          // Esta función hace un pedido al JSON donde se ubica la información de los comentarios

document.addEventListener("DOMContentLoaded", function () {  // Escucha de cuando carga ejecuta una funcion
  let productID = localStorage.getItem("productoID"); // guardo el valor de productoID (previamente guardado en localstorage) en "prouctID" con el let. 
  getJSONData(PRODUCT_INFO_COMMENTS_URL + productID + EXT_TYPE).then(resultado => { // concateno la URL de la que tiene que recibir la información
      if (resultado.status === "ok") {
          showCommentsInfo(resultado.data); // si está "ok" ejecuto la funcion "showProductsInfo" corriendole "resultado.data"
      }else{
          alert("No me trae datos JSON") // si no está "ok", aparece un alert avisandome
      }
  })
})


// FUNCION QUE MUESTRA COMENTARIOS


function showCommentsInfo(comentarios) { // Definimos funcion
  let templateAuto = "";
  for (let i = 0; i < comentarios.length; i++) { // Nuevamente utilizamos for para recorrer la lista
    let comentario = comentarios[i];
    
  templateAuto+=`
  <br>
  <ul class="list-group">
    <li class="list-group-item"><strong>${comentario.user}</strong> - ${comentario.dateTime} - ${estrellas(comentario.score)}
    <br>${comentario.description}</li>
  </ul>
  `
  document.getElementById("contenedorComentarios").innerHTML = templateAuto; // insertamos en "contenedorComentarios"
  // en la linea 90 utilizamos la función "estrellas" que pone la cantidad de estrellas en función al "score"
}}




// FUNCION ESTRELLAS

function estrellas(score) { // definimos nueva funcion
  let estrellas =""; // estrellas está vacio

  for (let i = 0; i < 5; i++) { 
    if (i < score) { // si el valor de I es menor a score se va a poner las estrellas brillantes, si no, se ponen las no brillantes (hasta 5, porque el for lo define)
      estrellas += `<span class="fa fa-star checked"></span>`;
    } else {
      estrellas += `<span class="fa fa-star"></span>`;
    }
  }
  return estrellas;
}