import { useState } from "react";
import PokemonCard from "../pokemon-card";
import s from "./style.module.css";
function FightScreen({
  userPokemon,
  computerPokemon,
  attack,
  attackByComputer,
  move,
  logs,
}) {
  const [isAttackComputer, setIsAttackComputer] = useState(false);

  const attackComputer = () => {
    setIsAttackComputer(true);
    attack();
    setTimeout(() => {
      setIsAttackComputer(false);
    }, 500);
  };

  const viewLogs = logs
    .slice()
    .reverse()
    .map((log, index) => {
      return (
        <p key={index} className={s.logItem}>
          {log}
        </p>
      );
    });

  return (
    <div className={s.fightScreen}>
      <h1 className={s.battle}>Battle</h1>
      <h3 className={s.vs}>VS</h3>
      <div className={s.fighters}>
        <div className={isAttackComputer ? s.attack : ""}>
          <PokemonCard pokemon={userPokemon} canChoose={false} />
        </div>
        <div className={attackByComputer ? s.attackUser : ""}>
          <PokemonCard pokemon={computerPokemon} canChoose={false} />
        </div>
      </div>
      <button
        className={s.attackBtn}
        onClick={() => attackComputer()}
        disabled={move === "computer"}
      >
        attack
      </button>
      <div className={s.logsContainer}>{viewLogs}</div>
    </div>
  );
}
export default FightScreen;
