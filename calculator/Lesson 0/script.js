// 1
// alert("hello world")

//2
const button = document.getElementById("alertButton");

button.addEventListener("click", () => {
  alert("hello world")
});

// 3
// const nameInput = document.getElementById("nameInput");
// const nameButton = document.getElementById("nameButton");

// nameButton.addEventListener("click", () => {
//   alert(nameInput.value)
// })

//8A
const numberInput = document.getElementById("numberInput");
const numberButton = document.getElementById("numberButton");

numberButton.addEventListener("click", () => {
  alert(numberInput.value)
})

//8B adding strings
// const numberInputA = document.getElementById("numberInputA");
// const numberInputB = document.getElementById("numberInputB");
// const numberButtonAdd = document.getElementById("numberButtonAdd");

// numberButtonAdd.addEventListener("click", () => {
//   alert(numberInputA.value + numberInputB.value)
// }) 

//8C convert inputs to numbers
// const numberInputA = document.getElementById("numberInputA");
// const numberInputB = document.getElementById("numberInputB");
// const numberButtonAdd = document.getElementById("numberButtonAdd");

// numberButtonAdd.addEventListener("click", () => {
//   const numA = Number(numberInputA.value);
//   const numB = Number(numberInputB.value);
//   alert(numA + numB)
// })

//8D console.log
const numberInputA = document.getElementById("numberInputA");
const numberInputB = document.getElementById("numberInputB");
const numberButtonAdd = document.getElementById("numberButtonAdd");

numberButtonAdd.addEventListener("click", () => {
  const numA = Number(numberInputA.value);
  const numB = Number(numberInputB.value);
  console.log("hello console message");
  console.log(numberInputA.value)
  console.log(typeof numberInputA.value)
  console.log(typeof numA)
  alert(numA + numB)
})


