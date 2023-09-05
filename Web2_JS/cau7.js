const domain = 'https://pokeapi.co/api/v2'
const endpoint = 'pokemon'

async function getPokemonNames(pokemonID) {
  const start_time = new Date().valueOf()
  const pokemonPromises = [];
  for (let i = 0; i < pokemonID.length; i++) {
    pokemonPromises.push(getPokemon(`${domain}/${endpoint}/${pokemonID[i]}`))
  }
  try {
    const pokemonNames = await Promise.all(pokemonPromises);
    return pokemonNames
  } catch (error) {
    console.log('Error has occured: ' + error)
    return []
  }
}

function main() {
  const pokemonId = []
  for (let i = 0; i < 10; i++) {
    pokemonId.push(Math.floor(Math.random() * 600))
  }
  // create a timeout request promise
  const timeoutRequest = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(new Error('Cancel request: Operation took outweigh 2000ms'))
    }, 2000)
  })
  console.time('Operation')
  const fetchPokemonNames = getPokemonNames(pokemonId)
  Promise.race([fetchPokemonNames, timeoutRequest])
    .then((res) => {
      console.log('pokemon names', res)
    })
}
async function getPokemon(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}
function getPokemonPromise(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.name;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

main()