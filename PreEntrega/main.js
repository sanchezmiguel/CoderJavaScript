// main.js

// Lista para almacenar los resultados
const resultados = [];

function vaciarHistorial() {
    // Vaciar la lista de resultados
    resultados.length = 0;

    // Actualizar la tabla de resultados
    actualizarTablaResultados();
}
function calcularCuota() {
    const montoElement = document.getElementById('loanAmount');
    const tasaElement = document.getElementById('interestRate');
    const plazoElement = document.getElementById('loanTerm');
    const resultadoElemento = document.getElementById('result');

    if (!montoElement.value || !tasaElement.value || !plazoElement.value) {
        resultadoElemento.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    const montoPrestamo = parseFloat(montoElement.value);
    const tasaInteres = parseFloat(tasaElement.value);
    const plazoPrestamo = parseInt(plazoElement.value);

    if (isNaN(montoPrestamo) || isNaN(tasaInteres) || isNaN(plazoPrestamo) || montoPrestamo <= 0 || tasaInteres <= 0 || plazoPrestamo <= 0) {
        resultadoElemento.textContent = 'Ingrese valores numéricos y mayores que cero.';
        return;
    }

    const tasaMensual = (tasaInteres / 100) / 12;
    const cuotaMensual = (montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazoPrestamo));

    resultadoElemento.textContent = `Cuota mensual: $${cuotaMensual.toFixed(2)}`;

    // Agregar el resultado a la lista
    resultados.push(cuotaMensual);

    // Actualizar la tabla de resultados
    actualizarTablaResultados();
}

function actualizarTablaResultados() {
    const resultsBody = document.getElementById('resultsBody');
    // Limpiar la tabla antes de actualizar
    resultsBody.innerHTML = '';

    // Agregar cada resultado a la tabla
    resultados.forEach((cuota, index) => {
        const newRow = resultsBody.insertRow();
        const cell = newRow.insertCell(0);
        cell.textContent = `Resultado ${index + 1}: $${cuota.toFixed(2)}`;
    });
}