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

        const additionalPayment = getAdditionalPayment(loanAmount);

        const { monthlyPayment, totalPayment, amortizationDetails } = performLoanCalculations(loanAmount, interestRate, loanTerm, additionalPayment);

        displayResults(monthlyPayment, totalPayment, amortizationDetails);

        continueCalculations = prompt("¿Desea realizar otra operación? (Sí/No)").toLowerCase() === 'si';
    }
}

function getAdditionalPayment(loanAmount) {
    let additionalPaymentInput;
    do {
        additionalPaymentInput = prompt(`Ingrese pago adicional mensual (deje en blanco si no hay o no exceda el préstamo de ${loanAmount}):`);
    } while (!isValidAdditionalPayment(additionalPaymentInput, loanAmount));

    return isValidInput(additionalPaymentInput) ? parseFloat(additionalPaymentInput) : 0;
}

function isValidAdditionalPayment(value, loanAmount) {
    if (!isValidInput(value)) {
        return true;
    }

    const additionalPayment = parseFloat(value);
    return additionalPayment >= 0 && additionalPayment <= loanAmount;
}

function performLoanCalculations(loanAmount, interestRate, loanTerm, additionalPayment) {
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm;
    const amortizationFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
        / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    let remainingLoanAmount = loanAmount;
    let totalPayment = 0;
    let amortizationDetails = ''; // Almacenar detalles de amortización como cadena de texto

    for (let month = 1; month <= numberOfPayments; month++) {
        const monthlyPayment = (remainingLoanAmount + additionalPayment) * amortizationFactor;
        const interestPayment = remainingLoanAmount * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;

        remainingLoanAmount -= principalPayment;
        totalPayment += monthlyPayment;

        // Construir la cadena de detalles de amortización
        amortizationDetails += `Mes ${month}: Pago Mensual = ${monthlyPayment.toFixed(2)}, Pago Adicional = ${additionalPayment.toFixed(2)}, Intereses = ${interestPayment.toFixed(2)}, Principal = ${principalPayment.toFixed(2)}, Saldo Restante = ${remainingLoanAmount.toFixed(2)}\n`;
    }

    return { monthlyPayment: (loanAmount + additionalPayment) * amortizationFactor, totalPayment, amortizationDetails };
}

function displayResults(monthlyPayment, totalPayment, amortizationDetails) {
    alert("Resultado\n\n" +
        "Pago Mensual Estimado: " + monthlyPayment.toFixed(2) + " USD\n" +
        "Total a Pagar: " + totalPayment.toFixed(2) + " USD\n\n" +
        "Detalles de Amortización:\n" +
        amortizationDetails +
        "¡Gracias por usar nuestro simulador! 🚀 ");
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

function isValidInput(value) {
    return value !== null && value !== '' && !isNaN(value);
}

function isValidPositiveNumber(value) {
    return isValidInput(value) && parseFloat(value) > 0;
}
