1. the return statement

- exiting functions early when conditions aren't met
- preventing errors with guard clauses
- return stops the function immediately
- checking if conditions are valid before proceeding
- example: if (number === '.' && currentInput.includes('.')) { return; }

2. string methods

- .includes() checks if a string contains a character
- .slice() removes or extracts part of a string
- .length property tells us how many characters in a string
- currentInput.slice(0, -1) removes the last character
- these methods help us manipulate text

3. decimal point support

- preventing multiple decimal points in one number
- using .includes('.') to check if decimal already exists
- allowing decimal as first character: 0.5 is valid
- edge cases: what if user types "." first?

4. delete functionality

- removing the last digit entered
- using .slice(0, -1) to remove last character
- handling edge cases: what if only one digit left?
- resetting to '0' when string becomes empty
- giving users a way to fix mistakes

5. error handling

- division by zero prevention
- checking if current === 0 before dividing
- using alert() to give user feedback
- calling clearDisplay() to reset after error
- making the calculator safer to use

6. chained operations

- calculating automatically when starting a new operation
- allowing: 5 + 3 + 2 = 10 without pressing equals each time
- checking if operation !== null before appending new operator
- if operation exists, calculate() first, then set new operation
- making the calculator feel more natural to use
