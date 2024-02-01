// main.js

class Resultado {
    constructor(montoPrestamo, tasaInteres, plazoPrestamo, cuotaMensual, totalPrestamo, tipoMoneda) {
        this.montoPrestamo = montoPrestamo;
        this.tasaInteres = tasaInteres;
        this.plazoPrestamo = plazoPrestamo;
        this.cuotaMensual = cuotaMensual;
        this.totalPrestamo = totalPrestamo;
        this.tipoMoneda = tipoMoneda;
        this.fecha = new Date(); // fecha en la que se generó el resultado
    }
}

class Moneda {
    constructor(codigo, nombre) {
        this.codigo = codigo;
        this.nombre = nombre;
    }
}

// Función para cargar los resultados desde localStorage o crear una lista vacía
function cargarResultados() {
    const resultadosGuardados = localStorage.getItem('resultados');
    return resultadosGuardados ? JSON.parse(resultadosGuardados) : [];
}

// Llamar a la función para cargar resultados al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // Load results from localStorage
    const resultados = cargarResultados();

    // Update the results table in the UI
    actualizarTablaResultados(resultados);
});


// Lista para almacenar los resultados
const resultados = cargarResultados();

// Lista de tipos de monedas
const tiposMoneda = [
    new Moneda("USD", "Dólar estadounidense"),
    new Moneda("UYU", "Peso Uruguayo"),
    new Moneda("EUR", "Euro"),
    new Moneda("GBP", "Libra esterlina"),
];

// Función para cargar tipos de moneda en la lista desplegable
async function cargarTiposMoneda() {
    const currencySelect = document.getElementById('currency');

    try {
        // Fetch para obtener las tasas de cambio
        const response = await fetch('https://open.er-api.com/v6/latest');
        const data = await response.json();

        // Limpiar el select antes de agregar nuevas opciones
        currencySelect.innerHTML = '';

        // Agregar la moneda base (en este caso, USD)
        const baseCurrencyOption = document.createElement('option');
        baseCurrencyOption.value = 'USD';
        baseCurrencyOption.textContent = 'Dólar estadounidense (USD)';
        currencySelect.appendChild(baseCurrencyOption);

        // Agregar otras monedas con tasas de cambio
        for (const currencyCode in data.rates) {
            if (data.rates.hasOwnProperty(currencyCode)) {
                const option = document.createElement('option');
                option.value = currencyCode;
                option.textContent = `${currencyCode} (${data.rates[currencyCode]})`;
                currencySelect.appendChild(option);
            }
        }
    } catch (error) {
        console.error('Error al cargar tipos de moneda:', error);
    }
}

// Llamar a la función para cargar tipos de moneda al cargar la página
cargarTiposMoneda();

// Event listener para el botón de limpiar historial
document.getElementById('clearHistoryButton').addEventListener('click', vaciarHistorial);

// Función para vaciar el historial de resultados
function vaciarHistorial() {
    resultados.length = 0;
    actualizarTablaResultados();
    // Guardamos la lista actualizada en localStorage
    localStorage.setItem('resultados', JSON.stringify(resultados));
}

// Función para formatear la moneda
function formatearMoneda(valor, tipoMoneda) {
    return new Intl.NumberFormat('es', {style: 'currency', currency: tipoMoneda}).format(valor);
}


// Diccionario de tipos de moneda y sus intereses extras
const interesesExtras = {
    'USD': 0,     // Dólar estadounidense (sin interés extra)
    'UYU': 0.02,  // Peso Uruguayo (2% de interés extra)
    'EUR': 0.01,  // Euro (1% de interés extra)
    'GBP': 0.03   // Libra esterlina (3% de interés extra)
};

// Función principal para calcular la cuota del préstamo
function calcularCuota() {
    const montoElement = document.getElementById('loanAmount');
    const tasaElement = document.getElementById('interestRate');
    const plazoElement = document.getElementById('loanTerm');
    const currencyElement = document.getElementById('currency');
    const resultadoElemento = document.getElementById('result');

    if (!montoElement.value || !tasaElement.value || !plazoElement.value) {
        resultadoElemento.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    const montoPrestamo = parseFloat(montoElement.value);
    const tasaInteres = parseFloat(tasaElement.value);
    const plazoPrestamo = parseInt(plazoElement.value);
    const tipoMoneda = currencyElement.value;

    if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(plazoPrestamo) || montoPrestamo <= 0 || tasaInteres <= 0 || plazoPrestamo <= 0) {
        resultadoElemento.textContent = 'Ingrese valores numéricos y mayores que cero.';
        return;
    }

    let tasaMensual = (tasaInteres / 100) / 12;

    // Aplicar interés extra según el tipo de moneda
    if (interesesExtras.hasOwnProperty(tipoMoneda)) {
        tasaMensual += interesesExtras[tipoMoneda];
    }

    const cuotaMensual = (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoPrestamo));
    const totalPrestamo = cuotaMensual * plazoPrestamo;

    actualizarInterfazUsuario(cuotaMensual, totalPrestamo, tipoMoneda);

    const nuevoResultado = new Resultado(montoPrestamo, tasaInteres, plazoPrestamo, cuotaMensual, totalPrestamo, tipoMoneda);
    resultados.push(nuevoResultado);

    // Guardar la lista actualizada en localStorage después de calcular la cuota
    localStorage.setItem('resultados', JSON.stringify(resultados));

    actualizarTablaResultados();
}

// Hacer la función accesible globalmente
window.calcularCuota = calcularCuota;

// Función para actualizar la tabla de resultados en la interfaz
// En la función calcularCuota, después de agregar el nuevo resultado, actualiza la tabla de resultados y el filtro
function actualizarTablaResultados() {
    const resultados = cargarResultados();
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';

    resultados.forEach((resultado, index) => {
        const newRow = resultsBody.insertRow();

        const columns = [
            `Resultado ${index + 1}`,
            `$${resultado.montoPrestamo} ${resultado.tipoMoneda}`,
            `${resultado.tasaInteres + (interesesExtras.hasOwnProperty(resultado.tipoMoneda) ? interesesExtras[resultado.tipoMoneda] * 100 : 0)}%`,
            `${(interesesExtras.hasOwnProperty(resultado.tipoMoneda) ? interesesExtras[resultado.tipoMoneda] * 100 : 0)}%`,
            `${resultado.plazoPrestamo} meses`,
            `$${resultado.cuotaMensual.toFixed(2)} ${resultado.tipoMoneda}`,
            `$${resultado.totalPrestamo.toFixed(2)} ${resultado.tipoMoneda}`,
            resultado.fecha.toLocaleString()
        ];

        columns.forEach((column) => {
            const cell = newRow.insertCell();
            cell.textContent = column;
        });
    });

    actualizarFiltroMoneda();
}

// función para actualizar el filtro de moneda
function actualizarFiltroMoneda() {
    const currencyFilterSelect = document.getElementById('currencyFilter');
    const monedasUnicas = [...new Set(resultados.map(resultado => resultado.tipoMoneda))];

    // Limpiar opciones existentes
    currencyFilterSelect.innerHTML = '';

    // Agregar opción de mostrar todos
    const optionTodos = document.createElement('option');
    optionTodos.value = 'todos';
    optionTodos.textContent = 'Todos';
    currencyFilterSelect.appendChild(optionTodos);

    // Agregar opciones de moneda única
    monedasUnicas.forEach((moneda) => {
        const option = document.createElement('option');
        option.value = moneda;
        option.textContent = moneda;
        currencyFilterSelect.appendChild(option);
    });
}

// función para filtrar resultados
window.filtrarResultados = function () {
    const currencyFilterSelect = document.getElementById('currencyFilter');
    const selectedCurrency = currencyFilterSelect.value;

    console.log(selectedCurrency)

    if (selectedCurrency === 'todos') {
        // Mostrar todos los resultados
        actualizarTablaResultados();
    } else {
        // Filtrar resultados por moneda seleccionada
        const resultados = cargarResultados();
        const filteredResults = resultados.filter(resultado => resultado.tipoMoneda === selectedCurrency);
        mostrarResultadosFiltrados(filteredResults);
    }
}

// función para mostrar resultados filtrados
function mostrarResultadosFiltrados(resultadosFiltrados) {
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';

    resultadosFiltrados.forEach((resultado, index) => {
        const newRow = resultsBody.insertRow();

        const columns = [
            `Resultado ${index + 1}`,
            `$${resultado.montoPrestamo} ${resultado.tipoMoneda}`,
            `${resultado.tasaInteres + (interesesExtras.hasOwnProperty(resultado.tipoMoneda) ? interesesExtras[resultado.tipoMoneda] * 100 : 0)}%`,
            `${(interesesExtras.hasOwnProperty(resultado.tipoMoneda) ? interesesExtras[resultado.tipoMoneda] * 100 : 0)}%`,
            `${resultado.plazoPrestamo} meses`,
            `$${resultado.cuotaMensual.toFixed(2)} ${resultado.tipoMoneda}`,
            `$${resultado.totalPrestamo.toFixed(2)} ${resultado.tipoMoneda}`,
            resultado.fecha.toLocaleString()
        ];

        columns.forEach((column) => {
            const cell = newRow.insertCell();
            cell.textContent = column;
        });
    });
}


// Función para actualizar la interfaz de usuario con los resultados del cálculo
function actualizarInterfazUsuario(cuotaMensual, totalPrestamo, tipoMoneda) {
    const monthlyPaymentSpan = document.getElementById('monthlyPayment');
    const totalLoanSpan = document.getElementById('totalLoan');

    monthlyPaymentSpan.textContent = `${formatearMoneda(cuotaMensual, tipoMoneda)}`;
    totalLoanSpan.textContent = `${formatearMoneda(totalPrestamo, tipoMoneda)}`;
}
