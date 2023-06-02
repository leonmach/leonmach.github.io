let listaProductos = []; // aca guardo los elemntos que traje con getJSONData
let comissionPercentage = 0.15;
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD "; 
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let unitProductCostHTML
let subtotalAux
let productCurrency
let tipoDePago = "No ha seleccionado" // Dejo seteado por default "No ha seleccionado" para que aparezca "primero" este valor en la pagina.

// VALIDACIONES
// definimos variables que luego utilizaremos en funciones de validación

let calle = document.getElementById("calle");
let esquina = document.getElementById("esquina");
let numero = document.getElementById("numerocalle");
let esValido
let estadoCheckbox1 = document.getElementById("flexRadioDefault1");
let estadoCheckbox2 = document.getElementById("flexRadioDefault2");
let creditCardNumber = document.getElementById("numeroTarjeta")
let securityCode = document.getElementById("codigoSeguridad")
let expirationDate = document.getElementById("vencimiento")
let bankAccount = document.getElementById("numeroCuenta")



//

document.addEventListener("DOMContentLoaded", function () {  // Escucha de cuando carga ejecuta una funcion
    getJSONData(CART_INFO_URL + "25801" + EXT_TYPE).then(resultado => { // concateno la URL de la que tiene que recibir la información
        if (resultado.status === "ok") {
            productCurrency = resultado.data.articles[0].currency
            listaProductos = resultado.data.articles; // guardo el valor en listaProductos
            mostrarProductosCarrito(listaProductos); // le "paso" para que muestre todos los productos que me dio el fetch
            document.getElementById("tipoDePagoId").innerText = tipoDePago
        } else {
            alert("No me trae datos JSON") // si no está "ok", aparece un alert avisandome
        }
    })
    comisiones()
})

function mostrarProductosCarrito(productsCarrito) { // def. funcion que muestra los productos  
    let templateProducto = ""; // def. plantilla 

    for (let i = 0; i < productsCarrito.length; i++) { // def. un for que va navegando por cada producto (en este caso solo es 1)
        let product = productsCarrito[i];


        templateProducto += `<tr>
    <td><img src="${product.image}" width="50px"></td>
    <td>${product.name}</td>
    <td>${product.currency} ${product.unitCost}</td>
    <td>
        <input id="cantidadProductos" type="number" value="${product.count}" min="1" class="form-control" style="max-width:80px" onchange="multiplicadorPrecioProducto(event,${product.id})">
    </td>
    <th scope="row" id="precioSubtotal">${product.currency} ${product.unitCost * product.count}</th> 
    </tr>
    `
        // LA MULTIPLICACION LA HAGO EN EL MISMO TEMPLATE AUTO

        subtotalAux = product.unitCost * product.count;
        
        document.getElementById("listaProductosCarrito").innerHTML = templateProducto; // armo el HTML y lo agrego
    }
    updateTotalCosts(subtotalAux);

}

function multiplicadorPrecioProducto(e, idProducto) { // def. funcion que recibe el evento (onChange) y el ID del producto que ejecutó el evento(en este caso va a ser el de peugeot)
 //   console.log(e.target.value, idProducto); // aca un console para ver que me trae
    let productQuantity = e.target.value; // def. productQuantity que obtiene el valor del evento ejecutado
    for (let i of listaProductos) { // def. for que recorre lista de productos
        if (i.id == idProducto) { // busco el producto que ejecuto el evento con el ID que recibí
            i.count = productQuantity; // y le cambio la nueva cantidad
        }
    }

    mostrarProductosCarrito(listaProductos); // llamo a mostrarProductosCarrito para que me muestre los nuevos valores 
}


function updateTotalCosts(subtotalAux) { // creamos funcion que lo sacamos de sell.js, que actualizará el costo total de los productos en tiempo real
    
    if (productCurrency !== "USD") {  // if que si está en pesos me lo convertirá en dolares
        subtotalAux = subtotalAux * 42
    }

    let unitCostToShow = DOLLAR_SYMBOL + subtotalAux; // concatenamos el subtotal con el símbolo de dolares
    let comissionToShow = DOLLAR_SYMBOL + Math.round((subtotalAux * comissionPercentage)); // calculamos la comisión multiplicando el porcentaje seleccionado con el subtotal
    let totalCostToShow = DOLLAR_SYMBOL + ((Math.round(subtotalAux * comissionPercentage * 100) / 100) + parseInt(subtotalAux)); // este es el valor final aplicada con la comisión

    unitProductCostHTML = document.getElementById("productCostText").innerText = unitCostToShow; // agregamos valores al HTML
    document.getElementById("comissionText").innerText = comissionToShow;
    document.getElementById("totalCostText").innerText = totalCostToShow;
}


function comisiones() { // creamos funcion que dependiendo lo que seleccionemos me dará el valor de la comisión

    document.getElementById("goldradio").addEventListener("change", function(){
        comissionPercentage = 0.15;
        updateTotalCosts(subtotalAux);
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateTotalCosts(subtotalAux);
    });

    document.getElementById("standardradio").addEventListener("change", function(){
        comissionPercentage = 0.05;
        updateTotalCosts(subtotalAux);

    })};


function tipoDePagoTarjetaDeCredito() { // def. función que si selecciono tarjeta de crédito me va a desactivar o activar los campos para ingresar los valores

    let tipoPagoTarjetaDeCredito = "Tarjeta de crédito"

    if (document.getElementById("flexRadioDefault1").checked) {
        tipoDePago = tipoPagoTarjetaDeCredito
        document.getElementById("numeroTarjeta").removeAttribute("disabled");
        document.getElementById("codigoSeguridad").removeAttribute("disabled");
        document.getElementById("vencimiento").removeAttribute("disabled");
        document.getElementById("numeroCuenta").setAttribute("disabled", false);
        
 }

    document.getElementById("tipoDePagoId").innerText = tipoDePago
}

function tipoDePagoTransferenciaBancaria() { // def. funcion que si selecciono la cuenta bancara me va a desactivar o activar los campos para ingresar los valores

    let tipoPagoTransferenciaBancaria = "Transferencia bancaria"

    if (document.getElementById("flexRadioDefault2").checked) {
        tipoDePago = tipoPagoTransferenciaBancaria
         document.getElementById("numeroTarjeta").setAttribute("disabled", false);
         document.getElementById("codigoSeguridad").setAttribute("disabled", false);
         document.getElementById("vencimiento").setAttribute("disabled", false);
         document.getElementById("numeroCuenta").removeAttribute("disabled");
    }

    document.getElementById("tipoDePagoId").innerText = tipoDePago
}

function validacion() { // def. funcion que realizará la validación de todos los campos

    if (!calle.value) {  // VALIDACION CALLE
        calle.classList.add("is-invalid");
        calle.classList.remove("is-valid");
        esValido = false
      } else {
        calle.classList.add("is-valid");
        calle.classList.remove("is-invalid");
        esValido = true
      }

    if (!esquina.value) {  // VALIDACION ESQUINA
        esquina.classList.add("is-invalid");
        esquina.classList.remove("is-valid");
        esValido = false;
      } else {
        esquina.classList.add("is-valid");
        esquina.classList.remove("is-invalid");
        esValido = true;
      }

    if (!numero.value) {  // VALIDACION NUMERO CALLE
        numero.classList.add("is-invalid");
        numero.classList.remove("is-valid");
        esValido = false;
      } else {
        numero.classList.add("is-valid");
        numero.classList.remove("is-invalid");
        esValido = true;
      }
    
    if (estadoCheckbox1.checked || estadoCheckbox2.checked) { // VALIDACION DE LOS CHECKED (SIN ESTAN MARCADOS)
        document.getElementById("tipoDePagoAuxiliar").classList.add("is-valid");
        document.getElementById("tipoDePagoAuxiliar").classList.remove("is-invalid");
        esValido = true;
    } else {
        document.getElementById("tipoDePagoAuxiliar").classList.add("is-invalid");
        document.getElementById("tipoDePagoAuxiliar").classList.remove("is-valid");
        esValido = false;
    }


      if (estadoCheckbox1.checked) { // VALIDACION DEL CHECKBOX1 (tarjeta de crédito). Si el check 1 está marcado o no
        if (!creditCardNumber.value && !securityCode.value && !expirationDate.value) { // SENTENCIA DE QUE SI ESTA VACIO
        creditCardNumber.classList.add("is-invalid");
        creditCardNumber.classList.remove("is-valid");
        securityCode.classList.add("is-invalid");
        securityCode.classList.remove("is-valid");
        expirationDate.classList.add("is-invalid");
        expirationDate.classList.remove("is-valid");
        esValido = false; }
        else { // SENTENCIA SI TIENE VALOR
            creditCardNumber.classList.add("is-valid");
        creditCardNumber.classList.remove("is-invalid");
        securityCode.classList.add("is-valid");
        securityCode.classList.remove("is-invalid");
        expirationDate.classList.add("is-valid");
        expirationDate.classList.remove("is-invalid");
        esValido = true;
        }
      } else { // VALIDACION SI NO ES CHECKBOX1 TENDRÁ QUE SER CHECKBOX 2, Y SI LA MISMA TIENE UN VALOR, SE REALIZA LA VALIDACIÓN
        if (bankAccount.value) { // SENTENCIA SI TIENE VALOR
            bankAccount.classList.add("is-valid");
            bankAccount.classList.remove("is-invalid");
            esValido = true;
        }
        else { // SENTENCIA SI NO TIENE VALOR
            bankAccount.classList.add("is-invalid");
            bankAccount.classList.remove("is-valid");
            esValido = false;
        }
      }

    console.log(esValido) // LO UTILIZAMOS PARA SABER SI LUEGO DE LAS VALIDACIONES CUMPLIMOS LAS CONDICIONES PARA COMPRAR (SI ES TRUE, SE PUEDE COMPRAR)

      alertaCompraExitosa() // LUEGO DE VALIDAR, SE EJECUTA LA FUNCIÓN alertaCompraExitosa()

      
}

 function alertaCompraExitosa() { // def. función que si "esValido === true" le quitará la clase "hide" que definimos en styles.css, lo que hará que se muestre el cartel de compra exitosa
     if (esValido === true) {
        document.getElementById('alertId').classList.remove("hide");
     }
 }
