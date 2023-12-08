// main.js

function calculateLoan() {
    const maxAllowedValue = 1000000;
    let continueCalculations = true;

    while (continueCalculations) {
        const { loanAmount, interestRate, loanTerm } = getInputValues();

        if (!isValidInput(loanAmount) || !isValidInput(interestRate) || !isValidInput(loanTerm)) {
            alert("Por favor, ingrese valores numéricos válidos.");
            continue;
        }

        if (!areValuesValid(loanAmount, interestRate, loanTerm)) {
            alert(`Por favor, ingrese valores numéricos positivos que no excedan ${maxAllowedValue}.`);
            continue;
        }

        const { monthlyPayment, totalPayment } = performLoanCalculations(loanAmount, interestRate, loanTerm);

        displayResults(monthlyPayment, totalPayment);

        continueCalculations = prompt("¿Desea realizar otra operación? (Sí/No)").toLowerCase() === 'si';
    }
}

function getInputValues() {
    const loanAmountInput = prompt("Ingrese monto del préstamo:");
    const interestRateInput = prompt("Ingrese tasa de interés (%):");
    const loanTermInput = prompt("Ingrese plazo del préstamo en meses:");

    return {
        loanAmount: parseFloat(loanAmountInput),
        interestRate: parseFloat(interestRateInput),
        loanTerm: parseInt(loanTermInput),
    };
}

function areValuesValid(loanAmount, interestRate, loanTerm) {
    const maxAllowedValue = 1000000;
    return (
        isValidPositiveNumber(loanAmount) &&
        isValidPositiveNumber(interestRate) &&
        isValidPositiveNumber(loanTerm) &&
        loanAmount <= maxAllowedValue &&
        interestRate <= maxAllowedValue &&
        loanTerm <= maxAllowedValue
    );
}

function performLoanCalculations(loanAmount, interestRate, loanTerm) {
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm;
    const amortizationFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
        / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const monthlyPayment = loanAmount * amortizationFactor;
    const totalPayment = monthlyPayment * numberOfPayments;

    return { monthlyPayment, totalPayment };
}

function displayResults(monthlyPayment, totalPayment) {
    alert("Resultado\n\n" +
        "Pago Mensual Estimado: " + monthlyPayment.toFixed(2) + " USD\n" +
        "Total a Pagar: " + totalPayment.toFixed(2) + " USD\n" +
        "¡Gracias por usar nuestro simulador! 🚀 ");
}

function isValidInput(value) {
    return value !== null && value !== '' && !isNaN(value);
}

function isValidPositiveNumber(value) {
    return isValidInput(value) && parseFloat(value) > 0;
}
