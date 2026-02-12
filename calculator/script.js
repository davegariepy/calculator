let currentInput = '0';
let previousInput = '';
let operation = null;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

function deleteDigit() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) {
        return;
    }

    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operation !== null) {
        calculate();
    }

    previousInput = currentInput;
    currentInput = '0';
    operation = op;
}

function calculate() {
    if (operation === null || previousInput === '') {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = '';
    updateDisplay();
}
