// main.js

function calculateLoan() {
    // Obtener valores del formulario
    const loanAmount = parseFloat(document.getElementById('amount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);

    // Calcular la tasa de interés mensual
    let monthlyInterestRate = (interestRate / 100) / 12;

    // Calcular el número total de pagos
    let numberOfPayments = loanTerm;

    // Calcular el factor de amortización
    let amortizationFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
        / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Calcular el pago mensual
    let monthlyPayment = loanAmount * amortizationFactor;

    // Mostrar los resultados
    displayResults(monthlyPayment, numberOfPayments);
}

function displayResults(monthlyPayment, numberOfPayments) {
    const resultDiv = document.getElementById('result');
    let totalAmount = monthlyPayment * numberOfPayments;

    resultDiv.innerHTML = `<h2>Resultado</h2>`;
    resultDiv.innerHTML += `<p>Pago Mensual Estimado: ${monthlyPayment.toFixed(2)} USD</p>`;
    resultDiv.innerHTML += `<p>Total a Pagar: ${totalAmount.toFixed(2)} USD</p>`;

    let i = 0;
    let message = "¡Gracias por usar nuestro simulador! ";

    while (i < 5) {
        message += "🚀 ";
        i++;
    }

    // Agregar el mensaje al resultado
    resultDiv.innerHTML += `<p>${message}</p>`;
}

