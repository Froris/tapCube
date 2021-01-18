import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

import "./app-title.scss";

const AppTitle = ({ title }) => {
  const [username, setUsername] = useState("");
  const [maxScore, setMaxScore] = useState();
  const [state] = useContext(AppContext);

  useEffect(() => {
    setUsername(state.currentPlayer.username);
    setMaxScore(state.currentPlayer.maxScore);
  }, [state.currentPlayer]);

  return (
    <div className="title-container">
      <h1 className="app-title">{title}</h1>
      <span>
        {" "}
        welcome, {username}! Maximum score: {maxScore}
      </span>
    </div>
  );
};

export default AppTitle;
