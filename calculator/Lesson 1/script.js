// State variable to track what the user has entered
let currentInput = '0';

// Function to update the display with current input
function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = currentInput;
}

// Function to add a number to the current input
function appendNumber(number) {
  // If the display shows '0', replace it with the new number
  if (currentInput === '0') {
    currentInput = number;
  } else {
    // Otherwise, add the number to the end
    currentInput += number; // This is string concatenation
  }
  updateDisplay();
}

// Function to clear the display
function clearDisplay() {
  currentInput = '0';
  updateDisplay();
}
