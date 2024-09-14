import { useGetPokemonByNameQuery } from "../services/pokemon"

const PokemonDetails = ({ name }) => {
  const { data: pokemon, isLoading, isError } = useGetPokemonByNameQuery(name)

  if (isLoading) return <p>Loading {name}...</p>
  if (isError) return <p>Error loading {name}</p>
  if (!pokemon) return <p>No data</p>
  console.log(pokemon)

  return (
    <div className="group border-2 border-dotted border-purple-400 rounded-md p-5 w-fit text-center hover:bg-purple-400/20 hover:scale-[1.02] transition-all duration-300">
      <h2 className="font-bold capitalize">{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="group-hover:scale-110 transition-all duration-300" />
      {/* Display other details as needed */}
    </div>
  )
}

export default PokemonDetails
