import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";

import "./last-user-score.scss";

const LastUserScore = () => {
  const [state] = useContext(AppContext);
  const [lastPlayer, setLastPlayer] = useState({ name: "", points: "" });

  useEffect(() => {
    setLastPlayer(state.lastPlay);
  }, [state.lastPlay]);

  return (
    <div className="last-user-container">
      <h3>Last play:</h3>
      <span>
        Player`s name: <span className="last-user__name">{lastPlayer.name ? lastPlayer.name : "Player"}</span>
      </span>
      <span>
        Score: <span className="last-user__points">{lastPlayer.points}</span> points
      </span>
    </div>
  );
};

export default LastUserScore;
