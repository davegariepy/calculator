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
  if (currentInput === '0') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

// Function to handle operator button clicks
function appendOperator(op) {
  // Save the current input as the first number
  previousInput = currentInput;
  // Reset current input for the second number
  currentInput = '0';
  // Remember which operation to perform
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
