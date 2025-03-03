import React, { useEffect, useState } from "react";
import useWebSocket from "../../hooks/websocket";
import PokemonList from "../../components/pokemon-list";
import FightScreen from "../../components/fight-screen";

import { useNavigate } from "react-router-dom";
import InformationOverlay from "../../components/information-overlay";

const Game = () => {
  const WS_URL = process.env.REACT_APP_WS_URL;
  const { messages, lastMessage, sendMessage } = useWebSocket(WS_URL);
  const [isFight, setIsFight] = useState(false);
  const [text, setText] = useState(null);
  const [isComputerAttack, setIsComputerAttack] = useState(false);
  const [move, setMove] = useState("");
  const logs = lastMessage?.data?.logs ?? [];

  const token = localStorage.getItem("token");

  const startFight = (id) => {
    sendMessage({
      status: "start",
      pokemonId: id,
      token,
    });
    setIsFight(true);
  };

  const attack = async () => {
    sendMessage({
      status: "attack",
      token,
    });
  };

  useEffect(() => {
    if (lastMessage && lastMessage.statusCode === 400) {
      setText(lastMessage.message);
    }
    if (
      lastMessage &&
      lastMessage.statusCode === 200 &&
      lastMessage.data.winner === "user"
    ) {
      setText("User win!");
      setTimeout(() => {
        setIsFight(false);
      }, 3000);
    }
    if (
      lastMessage &&
      lastMessage.statusCode === 200 &&
      lastMessage.data.winner === "computer"
    ) {
      setText("Computer win!");
      setTimeout(() => {
        setIsFight(false);
      }, 3000);
    }

    setMove(lastMessage?.data?.move);
    if (move === "user" && isComputerAttack) {
      setIsComputerAttack(!isComputerAttack);
    }
    if (move === "computer" && !isComputerAttack) {
      setIsComputerAttack(!isComputerAttack);
    }
  }, [lastMessage]);

  return (
    <div>
      {isFight ? (
        <div>
          {lastMessage && lastMessage.statusCode === 200 && (
            <FightScreen
              userPokemon={lastMessage.data.userPokemon}
              computerPokemon={lastMessage.data.computerPokemon}
              attack={attack}
              attackByComputer={isComputerAttack}
              move={move}
              logs={logs ?? []}
            />
          )}
        </div>
      ) : (
        <PokemonList startFight={startFight} />
      )}
      {true && (
        <InformationOverlay
          text={text}
          setIsComputerAttack={setIsComputerAttack}
          onClose={() => setText(null)}
        />
      )}
    </div>
  );
};

export default Game;
