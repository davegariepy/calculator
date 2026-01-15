// State variables to track calculator state
let currentInput = '0';
let previousInput = '';
let operation = null;

// Function to update the display with current input
function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = currentInput;
}

// Function to add a number to the current input
function appendNumber(number) {
  // Prevent multiple decimal points
  if (number === '.' && currentInput.includes('.')) {
    return;
  }

  // Replace '0' with the number, unless it's a decimal point
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Function to delete the last digit
function deleteDigit() {
  // If more than one character, remove the last one
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    // If only one character left, reset to '0'
    currentInput = '0';
  }
  updateDisplay();
}

// Function to handle operator button clicks
function appendOperator(op) {
  // Auto-calculate if there's already an operation pending
  if (operation !== null) {
    calculate();
  }

  previousInput = currentInput;
  currentInput = '0';
  operation = op;
}

// Function to perform the calculation
function calculate() {
  // Guard clause: if no operation or first number, do nothing
  if (operation === null || previousInput === '') {
    return;
  }

  // Convert strings to numbers for calculation
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  // Use switch statement to handle different operations
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
      // Check for division by zero
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

  // Update current input with the result
  currentInput = result.toString();
  // Reset operation and previous input
  operation = null;
  previousInput = '';
  updateDisplay();
}

// Function to clear the display
function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operation = null;
  updateDisplay();
}
