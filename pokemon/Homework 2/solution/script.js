async function getData() {
  const url = "https://pokeapi.co/api/v2/pokemon/ditto"
  const response = await fetch(url);
  const data = await response.json();
  console.log(data)

  const nameElement = document.createElement("div");
  nameElement.textContent = data.name;
  document.body.appendChild(nameElement);
}

getData()
