const baseURL = "https://pokeapi.co/api/v2/pokemon";
const speciesURL = "https://pokeapi.co/api/v2/pokemon-species/";

async function getPokemon(name) {
  const data = fetch(`${baseURL}/${name}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => 404);

  return data;
}

async function getPokemonDescription(pokemonId) {
  let data = null;
  await fetch(`${speciesURL}${pokemonId}/`)
    .then((response) => response.json())
    .then((res) => {
      const descriptions = res.flavor_text_entries;
      descriptions.forEach((element) => {
        if (element.language.name === "en") {
          data = element.flavor_text;
        }
      });
    })
    .catch((error) => error);

  return data;
}

async function getPokedex(count) {
  let data = null;
  if (count !== null) {
    data = await fetch(`${baseURL}?limit=12&offset=${count}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
  } else {
    data = await fetch(`${baseURL}?limit=12&offset=1`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => console.log(error));
  }
  return data;
}
