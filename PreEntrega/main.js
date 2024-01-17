// main.js

import Resultado from './resultado.js';
import Moneda from './moneda.js';

// Lista para almacenar los resultados
const resultados = [];

// Lista de tipos de monedas
const tiposMoneda = [
    new Moneda("USD", "Dólar estadounidense"),
    new Moneda("UYU", "Peso Uruguayo"),
    new Moneda("EUR", "Euro"),
    new Moneda("GBP", "Libra esterlina"),
];

// Función para cargar tipos de moneda en la lista desplegable
function cargarTiposMoneda() {
    const currencySelect = document.getElementById('currency');

    tiposMoneda.forEach((tipo) => {
        const option = document.createElement('option');
        option.value = tipo.codigo;
        option.textContent = `${tipo.nombre} (${tipo.codigo})`;
        currencySelect.appendChild(option);
    });
}

// Llamar a la función para cargar tipos de moneda al cargar la página
cargarTiposMoneda();

// Event listener para el botón de limpiar historial
document.getElementById('clearHistoryButton').addEventListener('click', vaciarHistorial);

// Función para vaciar el historial de resultados
function vaciarHistorial() {
    resultados.length = 0;
    actualizarTablaResultados();
}

// Función para formatear la moneda
function formatearMoneda(valor, tipoMoneda) {
    return new Intl.NumberFormat('es', { style: 'currency', currency: tipoMoneda }).format(valor);
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

    actualizarTablaResultados();
}

// Hacer la función accesible globalmente
window.calcularCuota = calcularCuota;

// Función para actualizar la tabla de resultados en la interfaz
function actualizarTablaResultados() {
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';

    resultados.forEach((resultado, index) => {
        const newRow = resultsBody.insertRow();

        // Columnas de la fila
        const columns = [
            `Resultado ${index + 1}`,
            `$${resultado.montoPrestamo} ${resultado.tipoMoneda}`,
            `${resultado.tasaInteres + (interesesExtras.hasOwnProperty(resultado.tipoMoneda) ? interesesExtras[resultado.tipoMoneda] * 100 : 0)}%`, // Mostrar la tasa con el interés extra
            `${(interesesExtras.hasOwnProperty(resultado.tipoMoneda) ? interesesExtras[resultado.tipoMoneda] * 100 : 0)}%`, // Mostrar el interés extra
            `${resultado.plazoPrestamo} meses`,
            `$${resultado.cuotaMensual.toFixed(2)} ${resultado.tipoMoneda}`,
            `$${resultado.totalPrestamo.toFixed(2)} ${resultado.tipoMoneda}`,
            resultado.fecha.toLocaleString()
        ];

        // Agregar celdas a la fila
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
