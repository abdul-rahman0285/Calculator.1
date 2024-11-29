const calculationDisplay = document.querySelector('.calculation');
const calculatedDisplay = document.querySelector('.calculated');

let currentInput = '';
let previousInput = '';
let operator = '';

function updateCalculationDisplay() {
    calculationDisplay.value = `${previousInput} ${operator} ${currentInput}`;
}

function handleButtonClick(value) {
    if (!isNaN(value) || value === '.') { // If value is a number or decimal
        currentInput += value;
    } else if (value === 'C') { // Clear single entry
        currentInput = '';
    } else if (value === 'AC') { // Clear all entries
        currentInput = '';
        previousInput = '';
        operator = '';
        calculationDisplay.value = '';
        calculatedDisplay.value = '';
    } else if (value === '%') { // Percentage
        if (currentInput) {
            currentInput = (parseFloat(currentInput) / 100).toString();
        }
    } else if (value === '=') { // Equals
        if (previousInput && operator) {
            let result = calculate(parseFloat(previousInput), parseFloat(currentInput), operator);
            calculatedDisplay.value = result; // Show result in lower input
            currentInput = result.toString(); // Store result for further calculations
            previousInput = '';
            operator = '';
            calculationDisplay.value = ''; // Clear the upper input
        }
    } else { // Operator (+, -, *, /)
        if (currentInput) {
            if (previousInput && operator) {
                previousInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
            } else {
                previousInput = currentInput;
            }
            operator = value;
            currentInput = '';
        }
    }
    updateCalculationDisplay();
}

function calculate(a, b, op) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return a / b;
        default:
            return b;
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent.trim();
        handleButtonClick(value);
    });
});
