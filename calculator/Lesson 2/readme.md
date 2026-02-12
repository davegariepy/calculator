1. multiple state variables

- why we need previousInput and operation variables
- tracking multiple pieces of information at once
- previousInput stores the first number entered
- operation stores which math operation to perform (+, -, ×, ÷)
- how state variables work together to remember what the user wants to calculate

2. conditional logic (if/else)

- making decisions in code
- checking conditions before executing code
- using return to exit functions early
- guard clauses: if (something is wrong) { return; }
- preventing errors by checking before calculating

3. parseFloat() for conversion

- converting strings to numbers for math
- why we need this: "5" + "3" = "53" but parseFloat("5") + parseFloat("3") = 8
- difference between Number() and parseFloat()
- parseFloat handles decimal numbers better

4. switch statements

- cleaner way to handle multiple conditions
- checking one value against many possibilities
- case '+': for addition
- case '-': for subtraction
- break statement to exit the case
- default case for unexpected values

5. basic math operations

- implementing +, -, ×, ÷
- storing the operation for later use
- waiting for the second number before calculating
- displaying the result after pressing equals
