/* Variables + Prompt + alert */

let nombreUsuario = prompt("Por favor, ingrese su nombre").toLowerCase()
let apellidoUsuario = prompt("Por favor, ingrese su apellido").toLowerCase()
alert("Bienvenido " + nombreUsuario + " " + apellidoUsuario)



/* ESTRUCTURA DO-WHILE CON IF-ELSE IF  */


let legal = true

do{
    let edad = prompt("ingrese su edad")
    if(edad == "") { 
        console.error("no hubo ingreso de edad")
        legal = false
    }
    else if (edad === null || isNaN(parseInt(edad))) {
        console.error("No se ingresó una edad válida");
        legal = false;
    }
    else if(edad >= 18){ 
        alert("Usted puede permanecer en el sitio")
        console.log("El usuario es mayor de edad"),
        legal = false
    } else {
        let continuar = confirm("usted no es mayor de edad, desea continuar?")
        if (!continuar){    
            console.error("El Usuario no es mayor de edad")
            legal = false
        }else{
            alert("Bienvenido"),
            legal = false
        }
    }


}
while(legal)


/* FUNCTION */

function rendimientoSalario() {
    let salario = parseFloat(prompt ("ingrese su salario mensual (sin puntos ni coma)"))
    let horasPorSemana = parseFloat(prompt ("ingrese sus horas laborales por semana"))
    let resultado = (salario / (horasPorSemana*4)).toFixed(1)
    alert("Usted gana por hora trabajada " + resultado + "$")
}

rendimientoSalario()


/* FOR (no sabía que hacer de ejemplo para el for y estoy ansioso por la final)*/

for (let i = 1; i<8; i++){
    if (i === 7){
        console.log("La septima esta en camino")
    }else
    console.log("Boca tiene " + i + " copa Libertadores")
}




/* SWITCH */



let MesDelAño = 11

switch (MesDelAño) {
    case 1:
        console.log("Estamos en Enero")
        break
    case 2:
        console.log("Estamos en Febrero")
        break
    case 3:
        console.log("Estamos en Marzo")
        break
    case 4:
        console.log("Estamos en Abril")
        break
    case 5:
        console.log("Estamos en Mayo")
        break
    case 6:
        console.log("Estamos en Junio")
        break
    case 7:
        console.log("Estamos en Julio")
        break
    case 8:
        console.log("Estamos en Agosto")
        break
    case 9:
        console.log("Estamos en Septiembre")
        break
    case 10:
        console.log("Estamos en Octubre")
        break
    case 11:
        console.log("Estamos en Noviembre")
        break
    case 12:
        console.log("Estamos en Diciembre")
        break
        
}


