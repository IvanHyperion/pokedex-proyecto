import { useEffect, useState } from "react";
import "./App.css";
import PokemonCard from "./components/PokemonCard"; //Se creó un componente para los Pokémon

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const pokemonsPerPage = 6; //Se solicitó 6 máximo Pokémon por página, aunque se recomienda 8
  const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";


  //Manejo de la Pokeapi
  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}${id}`);
      const data = await response.json();

      setPokemonData((prev) => {
        if (!prev.some((pokemon) => pokemon.id === data.id)) {
          return [...prev, data].sort((a, b) => a.id - b.id);
        }
        return prev;
      });
    } catch (error) {
      console.error("ERROR FETCH", error);
    }
  };

  //Se solicitan todos los Pokémon de la primera generación (151)
  const fetchAllPokemon = async () => {
    for (let i = 1; i <= 151; i++) {
      fetchPokemon(i);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  //Filtrar Pokémon por nombre antes de paginar, con el fin de evitar repeticiones de Pokémon que luego se presentaban
  const filteredPokemons = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //Calcular los Pokémon a mostrar en la página actual, ya que al mapear luego se imprian en desorden, usando el index ayuda
  const startIndex = currentPage * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

  //Funciones para cambiar de página
  const nextPage = () => {
    if (endIndex < filteredPokemons.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="main-conteiner">
      <h1>Iván Cetina Ucan - Pokeapi</h1>

      {/*Input de búsqueda intantanea, para mejorar la experiencia se descartó el uso de botones, la interfaz minimalista ayudó */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        class="search"
        onChange={(e) => setSearchTerm(e.target.value)}
        
      />

      {/*Mostrar solo los Pokémon correspondientes a la página */}
      <div className="grid-container">
        {currentPokemons.length > 0 ? (
          currentPokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemonData={pokemon} />
          ))
        ) : (
          <p>
            No se encontraron resultados
          </p>
        )}
      </div>


      {/*Controles de paginación, al ser muchas páginas se decidió incluir dos botones extra para facilitar la exploración */}
      {/*No es la decisión más inteligente usar emoticones, pero son para facilitar el desarrollo */}
      {filteredPokemons.length > 6 && (
        <div className="pagination-controls">
          <button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
            ⏮ Primera
          </button>

          <button onClick={prevPage} disabled={currentPage === 0}>
            ◀ Anterior
          </button>

          <span>Página {currentPage + 1}</span>

          <button
            onClick={nextPage}
            disabled={endIndex >= filteredPokemons.length}
          >
            Siguiente ▶
          </button>

          <button
            onClick={() =>
            setCurrentPage(Math.floor(filteredPokemons.length / pokemonsPerPage))
            }
            disabled={endIndex >= filteredPokemons.length}
          >
            Última ⏭
          </button>
        </div>
      )}

    </div>
  );
}

export default App;

