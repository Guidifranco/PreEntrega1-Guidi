//Stock de indumentaria deportiva

const Zapatillas = function (nombre, precio, marca, stock) {
	this.nombre = nombre
	this.precio = precio
    this.marca = marca
	this.stock = stock
}

let zapas1 = new Zapatillas ("Curry SC 3Zero 3", 75000, "Under Armour", 1)
let zapas2 = new Zapatillas ("Giannis Inmortality DH4470-400", 125000, "Nike", 1)
let zapas3 = new Zapatillas ("Kobe Mentality Artisan Tea", 80000, "Nike", 1)
let zapas4 = new Zapatillas ("Under armour Flow Futr X 2", 65000, "Under Armour", 1)
let zapas5 = new Zapatillas ("Under Armour GS JET '23", 75000, "Under Armour", 1)

const Camiseta = function(nombre, precio, marca, stock) {
    this.nombre = nombre
    this.precio = precio
    this.marca =  marca
    this.stock = stock
}

let camiseta1 = new Camiseta ("LeBron James Los Angeles Lakers City Edition", 65000, "Nike", 5 )
let camiseta2 = new Camiseta ("Camiseta deportiva Kobe Bryant Los Angeles Lakers Adidas NBA", 80000, "Adidads, 1")

let lista1 = [zapas1, zapas2, zapas3, zapas4, zapas5]
let lista2 = [camiseta1, camiseta2]


/* Busqueda y Filtrado */

function filtrado() {
    let tipoPrenda = prompt("¿Qué tipo de prenda estás buscando? (Zapatillas/Camisetas/Buzos/Pantalones)").toLowerCase().trim();
   
    let listaSeleccionada;

    switch(tipoPrenda) {
        case "zapatillas":
            listaSeleccionada = lista1;
            break;
        case "camisetas":
            listaSeleccionada = lista2;
            break;
        default:
            alert("No disponemos de ese tipo de prenda");
            return;
    }

    let marcaPrenda = prompt("Ingresá la marca de " + tipoPrenda + " que deseas  (Nike, Adidas, Under Armour, Puma)").toUpperCase().trim();
    let resultado = listaSeleccionada.filter((x) => x.marca.toUpperCase().includes(marcaPrenda));

    if (resultado.length > 0) {
        alert("Mostraremos los resultados por consola")
        console.table(resultado);
    } else {
        alert("No disponemos " + tipoPrenda + " de la marca: " + marcaPrenda);
    }
}

// Llama a la función 
filtrado();

