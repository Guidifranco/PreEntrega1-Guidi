// Función constructora para prendas (tengo unicamente zapatillas y remeras)
function Prenda(modelo, precio, marca) {
    return {
        tipo: "",
        modelo: modelo,
        precio: precio,
        marca: marca
    };
}

// carga de datos JSON
async function cargarDatos(tipoPrenda, archivoJSON) {
    try {
        const response = await fetch(archivoJSON);
        const data = await response.json();

        switch (tipoPrenda) {
            case "zapatillas":
                return data.zapatillas_basquet.map(({ modelo, precio, marca }) => {
                    const zapatilla = Prenda(modelo, precio, marca);
                    zapatilla.tipo = "zapatilla";
                    return zapatilla;
                });
            case "remeras":
                return data.remeras_deportivas.map(({ modelo, precio, marca }) => {
                    const remera = Prenda(modelo, precio, marca);
                    remera.tipo = "remera";
                    return remera;
                });
            default:
                return [];
        }
    } catch (error) {
        console.error(`Error al cargar datos para ${tipoPrenda}: ${error.message}`);
        return [];
    }
}
// datos zapatillas
cargarDatos("zapatillas", "zapatillas.json")
    .then(data => lista1.push(...data))
    .catch(error => console.error(`Error al cargar datos de zapatillas: ${error.message}`));

// datos remeras
cargarDatos("remeras", "remeras.json")
    .then(data => lista2.push(...data))
    .catch(error => console.error(`Error al cargar datos de remeras: ${error.message}`));


// Función de búsqueda
function buscar(lista, marcaPrenda) {
    return lista.filter(prenda => prenda.marca.toLowerCase().includes(marcaPrenda.toLowerCase()));
}

/* Busqueda y Filtrado */

function filtrado() {
    let resultadoMostrar = document.getElementById("resultado");
    resultadoMostrar.innerHTML = "";

    document.getElementById("boton").addEventListener("click", async function () {
        resultadoMostrar.innerHTML = "";
        let tipoPrenda = document.getElementById("buscadorPrendas").value.toLowerCase().trim();

        if (tipoPrenda === "") {
            document.getElementById("contenido").innerHTML = "Por favor ingrese una prenda válida";
            return;
        }

        let listaSeleccionada = await cargarDatos(tipoPrenda, `${tipoPrenda}.json`);

        if (listaSeleccionada.length === 0) {
            document.getElementById("contenido").innerHTML = "No disponemos de ese tipo de prenda";
            return;
        }

        /* localStorage */
        localStorage.setItem("tipoPrenda", tipoPrenda);

        /* segundo input */
        let inputDivExiste = document.getElementById("inputDiv");

        if (!inputDivExiste) {
            let containerDiv = document.createElement("div");
            containerDiv.classList.add("container");

            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.classList.add("buscador");
            input.setAttribute("id", "marcaPrenda");
            input.setAttribute("placeholder", "Ingrese la marca que busca");

            let botonDiv = document.createElement("button");
            botonDiv.setAttribute("id", "marcaBoton");
            botonDiv.classList.add("boton");
            botonDiv.innerHTML = "Continuar";

            let inputDiv = document.createElement("div");
            inputDiv.setAttribute("id", "inputDiv");
            inputDiv.classList.add("container");
            inputDiv.appendChild(input);
            inputDiv.appendChild(botonDiv);

            document.body.appendChild(inputDiv);

            botonDiv.addEventListener("click", function () {
                let marcaPrenda = document.getElementById("marcaPrenda").value.toLowerCase().trim();
                let resultados = buscar(listaSeleccionada, marcaPrenda);
                mostrarResultados(resultados, resultadoMostrar);
            });
        }
    });
}

//  mostrar los resultados
function mostrarResultados(resultados, resultadoMostrar) {
    resultadoMostrar.innerHTML = "";

    if (resultados.length > 0) {
        Swal.fire({
            title: "Resultados de la búsqueda",
            html: resultados.map(prenda => `<p>${prenda.modelo}, ${prenda.marca}, ${prenda.precio}</p>`).join(''),
            icon: "success"
        });
    } else {
        Swal.fire({
            title: "No hay resultados para mostrar",
            icon: "info"
        });
    }

    localStorage.setItem("resultados", JSON.stringify(resultados));
    document.getElementById("buscadorPrendas").value = "";
    document.body.removeChild(document.getElementById("inputDiv"));
}

// Llama a la función 
filtrado();

// Recuperar info del localStorage y mostrar resultados al cargar la página
window.onload = function () {
    let tipoPrendaGuardado = localStorage.getItem("tipoPrenda");
    if (tipoPrendaGuardado) {
        document.getElementById("buscadorPrendas").value = tipoPrendaGuardado;

        filtrado();

        // Recuperar resultados del localStorage
        let resultadosGuardados = localStorage.getItem("resultados");
        if (resultadosGuardados) {
            let resultadosParseados = JSON.parse(resultadosGuardados);
            mostrarResultados(resultadosParseados, document.getElementById("resultado"));
        }
    }
}



// consumo de datos de un JSON local
//manejo de promesas con fetch , then y catch
// uso de sweetAlert en los resultados