// main.js

// Importar la clase Resultado desde el archivo resultado.js
import Resultado from './resultado.js';

// Lista para almacenar los resultados
const resultados = [];

// Lista de tipos de monedas
const tiposMoneda = [
    { codigo: "USD", nombre: "Dólar estadounidense" },
    { codigo: "UYU", nombre: "Peso Uruguayo" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra esterlina" },
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

function vaciarHistorial() {
    resultados.length = 0;
    actualizarTablaResultados();
}

function formatearMoneda(valor, tipoMoneda) {
    return new Intl.NumberFormat('es', { style: 'currency', currency: tipoMoneda }).format(valor);
}

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

    const tasaMensual = (tasaInteres / 100) / 12;
    const cuotaMensual = (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoPrestamo));
    const totalPrestamo = cuotaMensual * plazoPrestamo;

    resultadoElemento.innerHTML = `Cuota mensual: ${formatearMoneda(cuotaMensual, tipoMoneda)}, 
                                  Total del préstamo: ${formatearMoneda(totalPrestamo, tipoMoneda)}`;

    const nuevoResultado = new Resultado(montoPrestamo, tasaInteres, plazoPrestamo, cuotaMensual, totalPrestamo, tipoMoneda);
    resultados.push(nuevoResultado);

    actualizarTablaResultados();
}
window.calcularCuota = calcularCuota;

function actualizarTablaResultados() {
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';

    resultados.forEach((resultado, index) => {
        const newRow = resultsBody.insertRow();
        const cell = newRow.insertCell(0);
        cell.innerHTML = `Resultado ${index + 1}: 
                      Monto: $${resultado.montoPrestamo} ${resultado.tipoMoneda}, 
                      Tasa: ${resultado.tasaInteres}%, 
                      Plazo: ${resultado.plazoPrestamo} meses, 
                      Cuota: $${resultado.cuotaMensual.toFixed(2)} ${resultado.tipoMoneda}, 
                      Total del préstamo: $${resultado.totalPrestamo.toFixed(2)} ${resultado.tipoMoneda}, 
                      Fecha: ${resultado.fecha.toLocaleString()}`;
    });
}
