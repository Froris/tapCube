import React, { useContext, useState, useEffect } from "react";

import { AppContext } from "../../context/AppContext";
import PopupList from "../modals/popupList/PopupList";

import "./styles/app-title.scss";

const AppTitle = ({ title }) => {
  const [username, setUsername] = useState("");
  const [maxScore, setMaxScore] = useState();
  const [showList, setShowList] = useState(false);
  const [state] = useContext(AppContext);
  const isAdmin = state.currentPlayer.role === "admin";

  const togglePopup = () => {
    setShowList(!showList);
  };

  useEffect(() => {
    setUsername(state.currentPlayer.username);
    setMaxScore(state.currentPlayer.maxScore);
  }, [state.currentPlayer]);

  return (
    <div className="title-container">
      <div className="title-block">
        <h1 className="app-title">{title}</h1>
        <span>
          welcome, {username}! Maximum score: {maxScore}
        </span>
      </div>
      {isAdmin && (
        <button className="admin-bar" onClick={togglePopup}>
          players list
        </button>
      )}
      {showList && <PopupList isShown={showList} onCloseHandler={togglePopup} />}
    </div>
  );
};

export default AppTitle;
