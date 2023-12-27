// Variables
let continuar = true;

// Clase de préstamo
class Prestamo {
    constructor(monto, tasaInteres, plazoMeses) {
        this.monto = monto;
        this.tasaInteres = tasaInteres;
        this.plazoMeses = plazoMeses;
        this.mensualidad = 0;
        this.totalPagar = 0;
    }

    calcularMensualidad() {
        this.mensualidad = (this.monto * this.tasaInteres) / (1 - Math.pow(1 + this.tasaInteres, -this.plazoMeses));
    }

    calcularTotalPagar() {
        this.totalPagar = this.mensualidad * this.plazoMeses;
    }

    calcularInteresMensual(pagoActual) {
        return pagoActual - this.monto * this.tasaInteres;
    }

    calcularInteresAnual() {
        return this.totalPagar - this.monto;
    }
}

// Clase Persona
class Persona {
    constructor(nombre, telefono) {
        this.nombre = nombre;
        this.telefono = telefono;
        this.prestamos = [];
    }

    agregarPrestamo(prestamo) {
        this.prestamos.push(prestamo);
    }
}

// Array de personas
const personas = [];

// Funciones esenciales
// Funciones de validación
function validarMonto(monto) {
    return !isNaN(monto) && monto > 0;
}

function validarTasaInteres(tasaInteres) {
    return !isNaN(tasaInteres) && tasaInteres > 0;
}

function validarPlazo(plazoMeses) {
    return !isNaN(plazoMeses) && plazoMeses > 0 && Number.isInteger(plazoMeses);
}


// Función para capturar entradas validadas para la persona
function capturarDatosPersona() {
    let nombre, telefono;

    do {
        nombre = prompt("Ingrese el nombre de la persona:");
    } while (!nombre.trim());

    do {
        telefono = prompt("Ingrese el teléfono de la persona:");
    } while (!telefono.trim());

    return new Persona(nombre, telefono);
}

// Función para capturar entradas validadas
function capturarEntradasValidadas() {
    const nuevaPersona = capturarDatosPersona();

    // Buscar si la persona ya existe en el array de personas (case-insensitive)
    const personaExistente = personas.find(persona => persona.nombre.toLowerCase() === nuevaPersona.nombre.toLowerCase());

    if (personaExistente) {
        // La persona ya existe, agregar el préstamo a esa persona
        agregarPrestamoAPersonaExistente(personaExistente);
    } else {
        // La persona no existe, crear una nueva y agregar el préstamo
        agregarNuevaPersonaConPrestamo(nuevaPersona);
    }
}

// Función para agregar préstamo a persona existente
function agregarPrestamoAPersonaExistente(personaExistente) {
    let prestamoInicial, tasaInteres, plazoMeses;

    do {
        prestamoInicial = parseFloat(prompt("Ingrese el monto del préstamo:"));
    } while (!validarMonto(prestamoInicial));

    do {
        tasaInteres = parseFloat(prompt("Ingrese la tasa de interés anual (porcentaje):")) / 100 / 12;
    } while (!validarTasaInteres(tasaInteres));

    do {
        plazoMeses = parseInt(prompt("Ingrese el plazo del préstamo en meses:"));
    } while (!validarPlazo(plazoMeses));

    const nuevoPrestamo = new Prestamo(prestamoInicial, tasaInteres, plazoMeses);
    nuevoPrestamo.calcularMensualidad();
    nuevoPrestamo.calcularTotalPagar();

    // Asociar el préstamo con la persona existente
    personaExistente.agregarPrestamo(nuevoPrestamo);
}

// Función para agregar nueva persona con préstamo
function agregarNuevaPersonaConPrestamo(nuevaPersona) {
    let prestamoInicial, tasaInteres, plazoMeses;

    do {
        prestamoInicial = parseFloat(prompt("Ingrese el monto del préstamo:"));
    } while (!validarMonto(prestamoInicial));

    do {
        tasaInteres = parseFloat(prompt("Ingrese la tasa de interés anual (porcentaje):")) / 100 / 12;
    } while (!validarTasaInteres(tasaInteres));

    do {
        plazoMeses = parseInt(prompt("Ingrese el plazo del préstamo en meses:"));
    } while (!validarPlazo(plazoMeses));

    const nuevoPrestamo = new Prestamo(prestamoInicial, tasaInteres, plazoMeses);
    nuevoPrestamo.calcularMensualidad();
    nuevoPrestamo.calcularTotalPagar();

    // Asociar el préstamo con la nueva persona
    nuevaPersona.agregarPrestamo(nuevoPrestamo);

    // Agregar la nueva persona al array de personas
    personas.push(nuevaPersona);
}

function mostrarResultado() {
    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];

        for (let j = 0; j < persona.prestamos.length; j++) {
            const prestamo = persona.prestamos[j];


            console.log(`Préstamo ${j + 1} para ${persona.nombre}`);
            console.log("Mensualidad: $" + prestamo.mensualidad.toFixed(2));
            console.log("Total a pagar: $" + prestamo.totalPagar.toFixed(2));
            console.log("Tasa de interés: " + (prestamo.tasaInteres * 12 * 100).toFixed(2) + "%");
            console.log("Interés Mensual: $" + prestamo.calcularInteresMensual(prestamo.mensualidad).toFixed(2));
            console.log("Interés Anual: $" + prestamo.calcularInteresAnual().toFixed(2));
            console.log("--------------------");
        }
    }
}

function buscarPorMensualidad(mensualidadBuscada) {
    const prestamosEncontrados = [];

    for (const persona of personas) {
        for (const prestamo of persona.prestamos) {
            if (Math.abs(prestamo.mensualidad - mensualidadBuscada) < 0.01) {
                prestamosEncontrados.push({persona, prestamo});
            }
        }
    }

    return prestamosEncontrados;
}

function filtrarPorTasaInteres(tasaInteresFiltrada) {
    const prestamosEncontrados = [];

    for (const persona of personas) {
        for (const prestamo of persona.prestamos) {
            if (Math.abs(prestamo.tasaInteres - tasaInteresFiltrada) < 0.01) {
                prestamosEncontrados.push({persona, prestamo});
            }
        }
    }

    return prestamosEncontrados;
}

function filtrarPorMontoInicial(montoInicialFiltrado) {
    const prestamosEncontrados = [];

    for (const persona of personas) {
        for (const prestamo of persona.prestamos) {
            if (Math.abs(prestamo.monto - montoInicialFiltrado) < 0.01) {
                prestamosEncontrados.push({persona, prestamo});
            }
        }
    }

    return prestamosEncontrados;
}

function filtrarPorPlazo(plazoFiltrado) {
    const prestamosEncontrados = [];

    for (const persona of personas) {
        for (const prestamo of persona.prestamos) {
            if (prestamo.plazoMeses === plazoFiltrado) {
                prestamosEncontrados.push({persona, prestamo});
            }
        }
    }

    return prestamosEncontrados;
}

function mostrarBusquedaFiltrado() {
    let continuarBusqueda = true;

    while (continuarBusqueda) {
        const opcionFiltrado = parseInt(prompt(
            "Opciones de Filtrado:\n1. Filtrar por mensualidad\n2. Filtrar por tasa de interés\n3. Filtrar por monto inicial\n4. Filtrar por plazo en meses\n5. Volver al menú principal"));

        switch (opcionFiltrado) {
            case 1:
                const mensualidadBuscada = parseFloat(prompt("Ingrese la mensualidad a buscar:"));
                const prestamosEncontradosMensualidad = buscarPorMensualidad(mensualidadBuscada);
                console.log(`Préstamos con mensualidad de $${mensualidadBuscada.toFixed(2)}:`);
                mostrarPrestamosEncontrados(prestamosEncontradosMensualidad);
                break;
            case 2:
                const tasaInteresFiltrada = parseFloat(prompt("Ingrese la tasa de interés a filtrar:"));
                const prestamosEncontradosTasaInteres = filtrarPorTasaInteres(tasaInteresFiltrada);
                console.log(`Préstamos con tasa de interés de ${tasaInteresFiltrada * 100}%:`);
                mostrarPrestamosEncontrados(prestamosEncontradosTasaInteres);
                break;
            case 3:
                const montoInicialFiltrado = parseFloat(prompt("Ingrese el monto inicial a filtrar:"));
                const prestamosEncontradosMontoInicial = filtrarPorMontoInicial(montoInicialFiltrado);
                console.log(`Préstamos con monto inicial de $${montoInicialFiltrado.toFixed(2)}:`);
                mostrarPrestamosEncontrados(prestamosEncontradosMontoInicial);
                break;
            case 4:
                const plazoFiltrado = parseInt(prompt("Ingrese el plazo a filtrar en meses:"));
                const prestamosEncontradosPlazo = filtrarPorPlazo(plazoFiltrado);
                console.log(`Préstamos con plazo de ${plazoFiltrado} meses:`);
                mostrarPrestamosEncontrados(prestamosEncontradosPlazo);
                break;
            case 5:
                continuarBusqueda = false;
                break;
            default:
                console.log("Opción no válida. Inténtelo de nuevo.");
        }
    }
}

function mostrarPrestamosEncontrados(prestamosEncontrados) {
    if (prestamosEncontrados.length === 0) {
        console.log("No se encontraron préstamos.");
    } else {
        prestamosEncontrados.forEach(({persona, prestamo}, index) => {
            console.log(`Préstamo ${index + 1} para ${persona.nombre}`);
            console.log("Mensualidad: $" + prestamo.mensualidad.toFixed(2));
            console.log("Total a pagar: $" + prestamo.totalPagar.toFixed(2));
            console.log("Tasa de interés: " + (prestamo.tasaInteres * 100).toFixed(2) + "%");
            console.log("Interés Mensual: $" + ((prestamo.mensualidad * prestamo.plazoMeses) - prestamo.monto).toFixed(2));
            console.log("Interés Anual: $" + ((prestamo.totalPagar) - prestamo.monto).toFixed(2));
            console.log("--------------------");
        });
    }
}

function listarPersonas() {
    if (personas.length === 0) {
        console.log("No hay personas registradas.");
    } else {
        console.log("Listado de Personas:");
        personas.forEach((persona, index) => {
            console.log(`${index + 1}. Nombre: ${persona.nombre}, Teléfono: ${persona.telefono}, Préstamos: ${persona.prestamos.length}`);
        });
        console.log("--------------------");
    }
}

function ejecutarOpcion() {
    continuar = true;
    while (continuar) {
        const opcion = parseInt(prompt(
            "Seleccione una opción:\n1. Calcular nuevo préstamo\n2. Mostrar resultados\n3. Buscar y Filtrar\n4. Listar Personas\n5. Salir"));

        switch (opcion) {
            case 1:
                capturarEntradasValidadas();
                break;
            case 2:
                mostrarResultado();
                break;
            case 3:
                mostrarBusquedaFiltrado();
                break;
            case 4:
                listarPersonas();
                break;
            case 5:
                continuar = false;
                break;
            default:
                console.log("Opción no válida. Inténtelo de nuevo.");
        }
    }
}