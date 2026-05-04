async function getData() {
  const url = "https://pokeapi.co/api/v2/pokemon/ditto"
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

  // TODO 1: create a new <div> element using document.createElement
  //         and store it in a variable called nameElement.

  // TODO 2: set the text inside nameElement to data.name
  //         using the .textContent property.

  // TODO 3: add nameElement to the page by appending it to document.body.
}

getData()
