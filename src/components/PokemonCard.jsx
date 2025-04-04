import React, { useState } from "react";
import PokemonModal from "./PokemonModal"; 

//Se decidió realizar una Tarjeta minimalista para no tener una carga visual y unicamente mantener los datos importantes

export default function PokemonCard({ pokemonData }) {
    //Se implementa un modal para mejorar la experiencia y conocer mayor información de cada Pokémon
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!pokemonData) {
        return <h1>Cargando...</h1>;
    }

    return (
    <div
      className="pokemon-card"
    >
        <div className="top-card">
        
      <img
        class="pokemon-imagen"
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        
        onClick={() => setIsModalOpen(true)}
      />
      </div>
        <div class="pokemon-info">
            <p className="pokemon-id">#{pokemonData.id}</p>
            <p className="pokemon-name">{pokemonData.name}</p>
        </div>

      {/*Boton para acceder al modal*/}
      <button className="pokemon-stats-bttn" onClick={() => setIsModalOpen(true)} style={{ marginTop: "10px" }}>
        Ver estadísticas
      </button>

      
      {isModalOpen && <PokemonModal pokemon={pokemonData} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
