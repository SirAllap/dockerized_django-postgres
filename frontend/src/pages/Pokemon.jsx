import { useEffect, useState } from "react"
import { useGetAllPokemonsQuery } from "../services/pokemon"
import PokemonDetails from "../components/PokemonDetails"
import { ToggleScreenMode } from "../components/ToggleScreenMode"
import { LogoutButton } from "../components/LogoutButton"
import { useNavigate } from "react-router-dom"

const Pokemon = () => {
  const navigate = useNavigate()
  const [selectedPokemons, setSelectedPokemons] = useState([])
  const [loadNumber, setLoadNumber] = useState(20)
  const {
    data: getAllPokemons,
    isLoading: loadingAllPokemons,
    isError: errorAllPokemons,
  } = useGetAllPokemonsQuery({ limit: loadNumber })

  // This effect triggers once all Pokemons are loaded
  useEffect(() => {
    if (getAllPokemons && getAllPokemons.results.length > 0) {
      const pokemonNames = getAllPokemons.results.map(
        (pokemon) => pokemon.name,
      )
      setSelectedPokemons(pokemonNames) // Store the list of names
    }
  }, [getAllPokemons])

  if (loadingAllPokemons) return <p>Loading...</p>
  if (errorAllPokemons) return <p>Error loading pokemons...</p>

  return (
    <div className="max-w-screen-xl mx-auto py-5 px-5">
      <section className="max-w-screen-xl flex flex-row justify-end gap-5">
        <button
          className="border border-yellow-300 bg-yellow-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
          onClick={() => navigate("/expenses")}
        >
          Add expenses
        </button>
        <button
          className="border border-yellow-300 bg-yellow-500 py-2 px-5 text-white rounded-md hover:bg-transparent hover:text-yellow-500 transition-all duration-300"
          onClick={() => navigate("/")}
        >
          Add notes
        </button>
        <ToggleScreenMode />
        <LogoutButton />
      </section>
      <div className="max-w-2xl max-h-[95dvh] py-10 mx-auto text-center overflow-y-auto">
        <h1 className="mb-5">Pokemon Details</h1>
        <section className="flex flex-wrap justify-center items-center gap-4">
          {selectedPokemons.map((pokemonName, index) => (
            <div key={pokemonName}>
              <a href={getAllPokemons.results[index].url}>JSON</a>
              <PokemonDetails key={pokemonName} name={pokemonName} />
            </div>
          ))}
        </section>
        <button
          className="border border-indigo-300 bg-indigo-500 py-2 px-5 min-w-32 text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300 sticky bottom-0 mt-5"
          onClick={() => setLoadNumber((prev) => prev + 20)}
        >
          Load more pokemons
        </button>
      </div>
    </div>
  )
}

export default Pokemon
