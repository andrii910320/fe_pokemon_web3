import s from "./style.module.css";
import { LuSword } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShield } from "react-icons/md";
import { PiSneakerMove } from "react-icons/pi";
import cn from "classnames";
import { useState } from "react";
import { CircleLoader } from "react-spinners";

function PokemonCard({ pokemon, startFight, canChoose = true, key }) {
  const type = pokemon.type.map((type, index) => {
    return <span key={index}>{type} </span>;
  });
  const pokeball = `https://cdn.pixabay.com/photo/2016/09/01/09/31/pokemon-1635610_1280.png`;
  return (
    <div key={key}>
      <div className={cn(s.pokemonCard, { [s.disabled]: !canChoose })}>
        {pokemon?.base ? (
          <img src={pokemon.image.hires} alt={pokemon.name.english} />
        ) : (
          <img className={s.transparent} src={pokeball} />
        )}
        <h2 className={cn(s[pokemon.type[0].toLowerCase()], s.textStroke)}>
          {pokemon.name.english}
        </h2>
        <p className={s.types}>{type}</p>
        <div className={s.heart}>
          <FaRegHeart className={s.icon} />
          <p>{canChoose ? pokemon?.base?.HP : pokemon?.base?.HP.toFixed(1)}</p>
        </div>
        <div className={s.stats}>
          <div>
            <LuSword />
            <p>{pokemon?.base?.Attack}</p>
          </div>
          <div className={s.divider}>/</div>
          <div>
            <MdOutlineShield />
            <p>{pokemon?.base?.Defense}</p>
          </div>
        </div>
        <div className={s.speed}>
          <PiSneakerMove />
          {pokemon?.base?.Speed}
        </div>
        {startFight && pokemon?.base?.Speed && (
          <button
            className={s.startBtn}
            onClick={() => {
              startFight(pokemon.id);
            }}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}
export default PokemonCard;
