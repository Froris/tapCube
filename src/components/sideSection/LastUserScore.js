import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

import "./styles/last-user-score.scss";

const LastUserScore = () => {
  const [state] = useContext(AppContext);
  const [currentPlayer, setCurrentPlayer] = useState({});

  useEffect(() => {
    setCurrentPlayer(state.currentPlayer);
  }, [state.currentPlayer]);

  return (
    <div className="last-user-container">
      <h3>Current player:</h3>
      <span>
        Name: <span className="last-user__name">{currentPlayer.username ? currentPlayer.username : ""}</span>
      </span>
      <span>
        Score: <span className="last-user__points">{currentPlayer.score ? currentPlayer.score : 0}</span> points
      </span>
    </div>
  );
};

export default LastUserScore;
