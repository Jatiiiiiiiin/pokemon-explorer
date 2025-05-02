// Fetch all pokemon (with limit)
export async function fetchAllPokemon(limit = 151) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
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
      stats: pokemon.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
      species: pokemon.species,
    }))
  } catch (error) {
    console.error("Error fetching Pokemon data:", error)
    throw new Error("Failed to fetch Pokemon data")
  }
}

// Fetch detailed information for a specific pokemon
export async function fetchPokemonDetails(idOrName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`)
    const data = await response.json()

    // Transform the data
    return {
      id: data.id,
      name: data.name,
      sprite: data.sprites.front_default,
      sprites: {
        front: data.sprites.front_default,
        back: data.sprites.back_default,
        frontShiny: data.sprites.front_shiny,
        backShiny: data.sprites.back_shiny,
      },
      types: data.types.map((type) => type.type.name),
      stats: data.stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      height: data.height / 10, // Convert to meters
      weight: data.weight / 10, // Convert to kg
      abilities: data.abilities.map((ability) => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden,
      })),
      moves: data.moves.slice(0, 10).map((move) => move.move.name), // Limit to 10 moves
      species: data.species,
    }
  } catch (error) {
    console.error(`Error fetching details for Pokemon ${idOrName}:`, error)
    throw new Error(`Failed to fetch details for Pokemon ${idOrName}`)
  }
}

// Fetch evolution chain for a pokemon
export async function fetchEvolutionChain(speciesUrl) {
  try {
    // First get the species data which contains the evolution chain URL
    const speciesResponse = await fetch(speciesUrl)
    const speciesData = await speciesResponse.json()

    // Then fetch the evolution chain
    const evolutionResponse = await fetch(speciesData.evolution_chain.url)
    const evolutionData = await evolutionResponse.json()

    // Process the evolution chain
    const processEvolutionChain = (chain) => {
      const result = {
        species: chain.species.name,
        evolves_to: chain.evolves_to.map((evolution) => processEvolutionChain(evolution)),
      }

      if (chain.evolution_details.length) {
        result.evolution_details = chain.evolution_details[0]
      }

      return result
    }

    return processEvolutionChain(evolutionData.chain)
  } catch (error) {
    console.error("Error fetching evolution chain:", error)
    return null
  }
}
