(async () => {
  const fs = require('fs');
  const path = require('path');
  const totalPokemons = 10;
  const totalPages = 10;

  const ids = Array.from({ length: totalPokemons }, (_, index) => index + 1);

  let fileContent = ids.map((id) => `/single-pokemon/${id}`).join('\n');
  const pagesIds = Array.from({ length: totalPages }, (_, index) => index + 1);
  fileContent += pagesIds.map((id) => `\n/pokemons/page/${id}`).join('');

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`,
  );
  if (!response.ok) {
    throw new Error(`PokeAPI request failed: ${response.status} ${response.statusText}`);
  }

  const pokemonNamesList = await response.json();
  if (!Array.isArray(pokemonNamesList.results)) {
    throw new Error('PokeAPI response did not contain a results list');
  }

  fileContent += '\n';
  fileContent += pokemonNamesList.results
    .map((pokemon) => `/single-pokemon/${pokemon.name}`)
    .join('\n');

  const routesFile = path.join(__dirname, '..', 'routes.txt');
  fs.writeFileSync(routesFile, fileContent);
  console.log('Routes generated');
})().catch((error) => {
  console.error('Failed to generate routes:', error);
  process.exitCode = 1;
});
