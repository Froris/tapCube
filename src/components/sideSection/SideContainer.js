import React, { useContext, useEffect, useState } from "react";

import "./styles/statistics.scss";
import PlayersList from "./PlayersList";
import { AppContext } from "../../context/AppContext";
import LastUserScore from "./LastUserScore";
import Logout from "./Logout";

const SideContainer = () => {
  const [state] = useContext(AppContext);
  const [playersList, setPlayersList] = useState(state.players);

  const setPlayersProgress = () => {
    // Добавляем полоску прогресса к объектам игроков
    const listWithProgress = state.players.map((player) => {
      let prevPlayer = state.players[0];
      if (prevPlayer === undefined) {
        return { ...player, rateBarLength: "100%" };
      } else {
        return { ...player, rateBarLength: Math.floor((player.score / prevPlayer.score) * 100) + "%" };
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
      <LastUserScore />
      <Logout />
    </div>
  );
};

export default SideContainer;
