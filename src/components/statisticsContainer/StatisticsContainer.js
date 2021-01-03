import React, { useContext, useEffect, useState } from "react";

import "./statistics.scss";
import PlayersList from "./playersList/PlayersList";
import { AppContext } from "../../context/AppContext";
import LastUserScore from "./lastUserScore/LastUserScore";

const StatisticsContainer = () => {
  const [state] = useContext(AppContext);
  const [playersList, setPlayersList] = useState(state.players);

  const setPlayersProgress = () => {
    // Добавляем полоску прогресса к объектам игроков
    const listWithProgress = state.players.map((player) => {
      let prevPlayer = state.players[0];
      if (prevPlayer === undefined) {
        return { ...player, rateBarLength: "100%" };
      } else {
        return { ...player, rateBarLength: Math.floor((player.points / prevPlayer.points) * 100) + "%" };
      }
    });

    return listWithProgress;
  };

  useEffect(() => {
    setPlayersList(setPlayersProgress());
  }, [state.players]);

  return (
    <div className="side-container">
      {state.players.length >= 1 && <PlayersList sortedList={playersList} />}
      {state.players.length >= 1 && <LastUserScore />}
    </div>
  );
};

export default StatisticsContainer;
