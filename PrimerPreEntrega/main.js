// main.js

function calculateLoan() {
    let continueCalculations = true;

    while (continueCalculations) {
        const loanAmountInput = prompt("Ingrese monto del préstamo:");
        const interestRateInput = prompt("Ingrese tasa de interés (%):");
        const loanTermInput = prompt("Ingrese plazo del préstamo en meses:");

        // Validar que los valores ingresados sean numéricos y no nulos
        if (!isValidInput(loanAmountInput) || !isValidInput(interestRateInput) || !isValidInput(loanTermInput)) {
            alert("Por favor, ingrese valores numéricos válidos.");
            continue; // Reinicia el bucle sin realizar cálculos
        }

        const loanAmount = parseFloat(loanAmountInput);
        const interestRate = parseFloat(interestRateInput);
        const loanTerm = parseInt(loanTermInput);

        // Validar que los valores sean números positivos y no excedan un valor máximo
        const maxAllowedValue = 1000000;
        if (!isValidPositiveNumber(loanAmount) || !isValidPositiveNumber(interestRate)
            || !isValidPositiveNumber(loanTerm) || loanAmount > maxAllowedValue
            || interestRate > maxAllowedValue || loanTerm > maxAllowedValue) {
            alert(`Por favor, ingrese valores numéricos positivos que no excedan ${maxAllowedValue}.`);
            continue; // Reinicia el bucle sin realizar cálculos
        }

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
        alert("Resultado\n\n" +
            "Pago Mensual Estimado: " + monthlyPayment.toFixed(2) + " USD\n" +
            "Total a Pagar: " + (monthlyPayment * numberOfPayments).toFixed(2) + " USD\n" +
            "¡Gracias por usar nuestro simulador! 🚀 ");

        // Preguntar al usuario si desea realizar otra operación
        const userInput = prompt("¿Desea realizar otra operación? (Sí/No)").toLowerCase();
        continueCalculations = userInput === 'si' || userInput === 'sí';
    }
}

function isValidInput(value) {
    return value !== null && value !== '' && !isNaN(value);
}

function isValidPositiveNumber(value) {
    return isValidInput(value) && parseFloat(value) > 0;
}
