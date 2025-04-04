import React, { useState } from "react";

//Colores de tipos, para agregar más personalidad se usa esta libreria de colores para cada tipo de Pokémon
const typeColors = {
    normal: "var(--type-normal)",
    fire: "var(--type-fire)",
    water: "var(--type-water)",
    grass: "var(--type-grass)",
    electric: "var(--type-electric)",
    ice: "var(--type-ice)",
    fighting: "var(--type-fighting)",
    poison: "var(--type-poison)",
    ground: "var(--type-ground)",
    flying: "var(--type-flying)",
    psychic: "var(--type-psychic)",
    bug: "var(--type-bug)",
    rock: "var(--type-rock)",
    ghost: "var(--type-ghost)",
    dark: "var(--type-dark)",
    dragon: "var(--type-dragon)",
    steel: "var(--type-steel)",
    fairy: "var(--type-fairy)",
  };

export default function PokemonModal({ pokemon, onClose }) {
    //Cmabiar a Shiny, para mejorar la experiencia se agregó un cambio de imagen a la versión shiny
  const [isShiny, setIsShiny] = useState(false);
  if (!pokemon) return null;

  //Consultar pistas de Audio, se agregaron sonido para poder complacer cada sentido
  const cryUrl = pokemon.cries?.latest || null;
  const playCry = () => {
    if (cryUrl) new Audio(cryUrl).play();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{pokemon.name}</h2>

        {/*Imagen del Pokemon y con cambio a Shiny */}
        <img
          src={isShiny ? pokemon.sprites.front_shiny : pokemon.sprites.front_default}
          alt={pokemon.name}
          onClick={() => setIsShiny(!isShiny)}
        />
        {/*Texto para facilitar la exploración */}
        <p>Haz clic en la imagen </p>

        {/*Personalizar cada Pokémon */}
        <h3>Tipos:</h3>
        <div className="pokemon-types">
          {pokemon.types.map((typeInfo) => (
            <span
              key={typeInfo.type.name}
              className="pokemon-type"
              style={{
                backgroundColor: typeColors[typeInfo.type.name], 
                color: "white", 
              }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>

          {/*Varias estadisticas, error en traducción */}
        <h3>Estadísticas</h3>
        <ul className="pokemon-stats">
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              <strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>

          {/*Botón para explorar */}
        <div className="modal-buttons">
          {cryUrl && (
            <button className="sound-button" onClick={playCry}>
              🔊 Reproducir sonido
            </button>
          )}
          <button className="close-button" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
