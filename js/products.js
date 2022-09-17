const ORDER_ASC_BY_PRICE = "Asc";
const ORDER_DESC_BY_PRICE = "Desc";
const ORDER_BY_PROD_REL = "Rel";
let currentProductsArray = [];
let minPrice = undefined;
let maxPrice = undefined;


document.addEventListener("DOMContentLoaded", function () {
    const catId = localStorage.getItem("catID"); /* definimos catID obteniendo la categoría específica fijada en "inicio.js" */
    getJSONData(PRODUCTS_URL + catId + EXT_TYPE)  /*función que realiza el fetch() y devuelve una promesa que contiene un objeto que contiene los objetos "status" y "data". En vez poner la URL concatenamos las constantes ya definidas en "init" */
        .then(data => { showProductsList(data.data.products), currentProductsArray = data.data.products }) /* con el .then recibimos el resultado de la promesa en la variable "data" y con "data.data.products" obtenemos el array de productos (es decir los objetos de auto) y a ese array se lo pasamos a la función showProductsList */
})



function showProductsList(array) {  /* creamos una función (showProductsList) que recibe un array */
    let templateAuto = "";  /* creamos una variable con un string vacio para concatenarlo con los "templateAuto". */
    for (let i = 0; i < array.length; i++) {  /* el for recorremos el array y decimos que "i" es la posición y que la posición tiene que ser menor al largo del array y que luego, se tiene que sumar 1 posicion con el i++ para pasar al siguiente elemento del array (al proximo producto9) */
        let producto = array[i]; /* guarda el elemento "auto" que está dentro del array "products" dentro de la variable "producto" */
           
        if (
            (minPrice === undefined || producto.cost >= minPrice) && // si minPrice y maxPrice no existen o el costo del producto está dentro de los rangos del filtro, se pondrá el "templateAuto" con los productos que cumplen la condición.
            (maxPrice === undefined || producto.cost <= maxPrice)
          ) {

        templateAuto += `
        <div class="list-group-item list-group-item-action" onclick="redirigir(${producto.id})">
            <div class="row">
                <div class="col-3">
                    <img src="${producto.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col" id="productoInfo">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${producto.name} - ${producto.currency} ${producto.cost}</h4> 
                        <p> `+ producto.description + `</p> 
                        </div>
                        <small class="text-muted"> ${producto.soldCount} vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `

        // Agrego "onclick" en la línea 28, que ejecuta la función redirigir que le corre el producto.id
        /* el template fue reutilizado y mantuve las clases de boostrap. A ese template se lo concateno a mi variable "templateAuto" que fue anteriormente creada vacía. */

        document.getElementById("lista-productos").innerHTML = templateAuto; /* con el document.getElementById("lista-productos") obtengo el div que contiene la id seleccionada y luego le aplico innerHTML que me permitirá modificar el HTML desde codigo js asignandole mi templateAuto (codigo HTML) */
    }
}


/* FILTROS */

// ORDENA POR PRECIO Y POR CANTIDAD VENDIDOS


function sortProducts(criteria, array) {  // crea una funcion que recibe "criteria" y un array. Guardo en result el resultado de ordenar con el método sort de forma ascendente (a - b)
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort((a, b) => a.cost - b.cost);
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort((a, b) => b.cost - a.cost); // Guardo en result el resultado de ordenar con el método sort de forma descendente (b - a)
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort((a, b) => b.soldCount - a.soldCount); // Guardo en result el resultado de ordenar de menor a mayor la cantidad de vendidos (b - a)
    }
    return result;

}

// TERMINA ORDENADO DE PRECIO Y CANTIDAD VENDIDOS

// BOTON DE LIMPIAR

document.getElementById("clearRangeFilter").addEventListener("click", function () {
  document.getElementById("rangeFilterCountMin").value = ""; //establecemos valores de min y max como strings vacios (para limpiarlos) y el valor de minprice y maxprice como undefined
  document.getElementById("rangeFilterCountMax").value = ""; // por lo tanto, quedará el casillero vacio

  minPrice = undefined;
  maxPrice = undefined;
  
  showProductsList(currentProductsArray) // llamo a la función para que me muestre todos los productos

});



// ESCUCHAS BOTONES

document.getElementById("sortAsc").addEventListener("click", function() { // ESCUCHA BOTON ASCENDENTE
    sortAndShowProducts(ORDER_ASC_BY_PRICE);
});

document.getElementById("sortDesc").addEventListener("click", function() { // ESCUCHA BOTON DESCENDENTE
    sortAndShowProducts(ORDER_DESC_BY_PRICE);

});

document.getElementById("sortByRelevance").addEventListener("click", function() { // ESCUCHA BOTON CANTIDAD VENDIDOS (REL)
    sortAndShowProducts(ORDER_BY_PROD_REL);

});

// TERMINA ESCUCHA BOTONES


function sortAndShowProducts(sortCriteria) { // creamos funcion que recibe "sortCriteria" que es el criterio para ordenar los productos
    currentProductsArray = sortProducts(sortCriteria, currentProductsArray); // Llama a la función sortProducts que va a ordenar por criterio al array que recibe y guarda el array ordenado en currentProductsArray y lo muestro

    showProductsList(currentProductsArray); // llamo a la función que muestran los productos para que me muestren los nuevos productos ordenados
}

//FILTROS BOTON "FILTRAR" (MIN MAX)

document.getElementById("rangeFilterCount").addEventListener("click", function () {
  let minValue = parseInt(document.getElementById("rangeFilterCountMin").value // Obtengo valor de los inputs
  );
  let maxValue = parseInt(document.getElementById("rangeFilterCountMax").value // Obtengo valor de los inputs
  );
  if (minValue >= 0) {
    minPrice = minValue;
  } else {
    document.getElementById("rangeFilterCountMin").value = ""; // Valido que sea > 0, si no, lo deja vacio
    minPrice = undefined;
  }

  if (maxValue >= 0) {
    maxPrice = maxValue;
  } else {
    document.getElementById("rangeFilterCountMax").value = ""; // Valido que sea > 0, si no, lo deja vacio
    maxPrice = undefined;
  }

  showProductsList(currentProductsArray); // llamo a la función que muestran los productos para que me muestren los nuevos productos ordenados
});
}

// Redirigir

function redirigir(id) { // defino función que recibe la ID del producto para guardar localmente la ID y redirigirlo a product info 
    localStorage.setItem("productoID", id); // guardo la ID
    window.location.href = "product-info.html" // me lleva
}




