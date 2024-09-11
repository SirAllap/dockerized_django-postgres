import { useGetPokemonByNameQuery } from "../services/pokemon";

const PokemonDetails = ({ name }) => {
  const { data: pokemon, isLoading, isError } = useGetPokemonByNameQuery(name);

  if (isLoading) return <p>Loading {name}...</p>;
  if (isError) return <p>Error loading {name}</p>;

  return (
    <div className="border-2 border-dotted border-indigo-400 p-5 w-fit text-center">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      {/* Display other details as needed */}
    </div>
  );
};

export default PokemonDetails;
