import { useEffect, useState } from "react";
import PokemonCard from "../pokemon-card";
import { fetchPokemon } from "../../api/pokemon/getPokemon";
import s from "./style.module.css";
import Pagination from "../pagination";

function PokemonList({ startFight }) {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPokemon(page, limit);
        setPokemons(response.pokemons);
        setTotalPages(Math.ceil(response.total / limit));
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchData();
  }, [page]);

  const showPokemon = pokemons.map((pokemon, index) => (
    <div key={index}>
      <PokemonCard pokemon={pokemon} startFight={startFight} />
    </div>
  ));
  return (
    <div>
      <h3 className={s.title}>Choose you pokemon for fight</h3>
      <div className={s.pokemonList}>{showPokemon}</div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
export default PokemonList;
