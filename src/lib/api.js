export async function fetchPokemonData() {
  try {
    // Fetch the first 150 Pokemon
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    const data = await response.json()

    // Fetch detailed information for each Pokemon
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const detailResponse = await fetch(pokemon.url)
        return await detailResponse.json()
      }),
    )

    // Transform the data into our Pokemon format
    return pokemonDetails.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map((type) => type.type.name),
    }))
  } catch (error) {
    console.error("Error fetching Pokemon data:", error)
    throw new Error("Failed to fetch Pokemon data")
  }
}
