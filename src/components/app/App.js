import React, { useContext, useEffect } from "react";

import "./app.scss";
import { baseURL } from "../../index";

import StatisticsContainer from "../statisticsContainer/StatisticsContainer";
import { AppContext } from "../../context/AppContext";
import FieldContainer from "../fieldContainer/FieldContainer";
import NewGameModal from "../modals/NewGameModal";
import EndGameModal from "../modals/EndGameModal";
import { GET_SAVED_PLAYERS, SAVE_LAST_PLAYER } from "../../actions/actionsType";

const App = () => {
  const [, dispatch] = useContext(AppContext);

  const getSavedPlayers = () => {
    fetch(`${baseURL}/get-players`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        // Если с сервера пришёл не пустой объект
        if (data.playersList) {
          dispatch({ type: GET_SAVED_PLAYERS, payload: data.playersList });
          dispatch({ type: SAVE_LAST_PLAYER, payload: data.lastPlay });
        }
      });
  };

  useEffect(() => {
    getSavedPlayers();
  }, []);

  return (
    <>
      <NewGameModal />
      <EndGameModal />
      <FieldContainer />
      <StatisticsContainer />
    </>
  );
};

export default App;
