//Stock de indumentaria deportiva

const Zapatillas = function (nombre, precio, marca, stock) {
    this.nombre = nombre
    this.precio = precio
    this.marca = marca
    this.stock = stock
}

let zapas1 = new Zapatillas("Curry SC 3Zero 3", "$75000", "Under Armour", 1)
let zapas2 = new Zapatillas("Giannis Inmortality DH4470-400", "$125000", "Nike", 1)
let zapas3 = new Zapatillas("Kobe Mentality Artisan Tea", "$80000", "Nike", 1)
let zapas4 = new Zapatillas("Under armour Flow Futr X 2", "$65000", "Under Armour", 1)
let zapas5 = new Zapatillas("Under Armour GS JET '23", "$75000", "Under Armour", 1)

const Camiseta = function (nombre, precio, marca, stock) {
    this.nombre = nombre
    this.precio = precio
    this.marca = marca
    this.stock = stock
}

let camiseta1 = new Camiseta("LeBron James Los Angeles Lakers City Edition", "$65000", "Nike", 5)
let camiseta2 = new Camiseta("Camiseta deportiva Kobe Bryant Los Angeles Lakers Adidas NBA", "$80000", "Adidas", 1)

let lista1 = [zapas1, zapas2, zapas3, zapas4, zapas5]
let lista2 = [camiseta1, camiseta2]


/* Busqueda y Filtrado */

function filtrado() {

    let resultadoMostrar = document.getElementById("resultado")

    resultadoMostrar.innerHTML = "";

    document.getElementById("boton").addEventListener("click", function () {

        resultadoMostrar.innerHTML = "";

        let tipoPrenda = document.getElementById("buscadorPrendas").value.toLowerCase().trim();

        if (tipoPrenda === "") {
            document.getElementById("contenido").innerHTML = "Por favor ingrese una prenda válida"
            return
        }

        let listaSeleccionada;

        switch (tipoPrenda) {
            case "zapatillas":
                listaSeleccionada = lista1;
                break;
            case "camisetas", "remeras":
                listaSeleccionada = lista2;
                break;
            default:
                document.getElementById("contenido").innerHTML = "No disponemos de ese tipo de prenda";
                return;
        }

        /* localStorage */

        localStorage.setItem("tipoPrenda", tipoPrenda)

        /* segundo input */

        let inputDivExiste = document.getElementById("inputDiv")    /* tuve que hacer esto pq se me creaba muchas veces el input si apretaba reiteradas veces el boton */

        if (!inputDivExiste) {
            let input = document.createElement("input")
            input.setAttribute("type", "text")
            input.classList.add("buscador")
            input.setAttribute("id", "marcaPrenda")
            input.setAttribute("placeholder", "Ingrese la marca que busca")

            let botonDiv = document.createElement("button")
            botonDiv.setAttribute("id", "marcaBoton")
            botonDiv.classList.add("boton")
            botonDiv.innerHTML = "Continuar"

            let inputDiv = document.createElement("div");
            inputDiv.setAttribute("id", "inputDiv");
            inputDiv.classList.add("container")
            inputDiv.appendChild(input);
            inputDiv.appendChild(botonDiv);

            document.body.appendChild(inputDiv)


            botonDiv.addEventListener("click", function () {

                let marcaPrenda = document.getElementById("marcaPrenda").value.toLowerCase().trim()
                let resultado = listaSeleccionada.filter((x) => x.marca.toLowerCase().includes(marcaPrenda));
                let resultadoMostrar = document.getElementById("resultado")

                resultadoMostrar.innerHTML = ""

                if (resultado.length > 0) {
                    resultadoMostrar.innerHTML = "<p>Resultados de la búsqueda: </p>"
                    resultado.forEach((prenda) => {
                        resultadoMostrar.innerHTML += `<p>${prenda.nombre}, ${prenda.marca}, ${prenda.precio}</p>`
                    });
                } else {
                    resultadoMostrar.innerHTML = `<p>No hay resultados para mostrar</p>`;
                }


                localStorage.setItem("resultados", JSON.stringify(resultado));

                document.getElementById("buscadorPrendas").value = "";

                document.body.removeChild(inputDiv);
            })
        }
    }

    )
}

// Llama a la función 
filtrado();

// Recuperar info del localStorage
window.onload = function () {
    let tipoPrendaGuardado = localStorage.getItem("tipoPrenda");
    if (tipoPrendaGuardado) {
        document.getElementById("buscadorPrendas").value = tipoPrendaGuardado;

        filtrado();

        // Recuperar resultados del localStorage
        let resultadosGuardados = localStorage.getItem("resultados");
        if (resultadosGuardados) {
            let resultadosParseados = JSON.parse(resultadosGuardados);
            resultadosParseados.forEach((prenda) => {
                resultadoMostrar.innerHTML += `<p>${prenda.nombre}, ${prenda.marca}, ${prenda.precio}</p>`;
            });
        }
    }
}

