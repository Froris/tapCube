import React, { useContext, useEffect } from "react";

import "./app.scss";
import { baseURL } from "../../index";

import StatisticsContainer from "../statisticsContainer/StatisticsContainer";
import { AppContext } from "../../context/AppContext";
import FieldContainer from "../fieldContainer/FieldContainer";
import NewGameModal from "../modals/NewGameModal";
import EndGameModal from "../modals/EndGameModal";
import { GET_SAVED_PLAYERS, SAVE_LAST_PLAYER, SET_AUTH } from "../../actions/actionsType";
import LoginComponent from "../authComponents/Login";

const App = () => {
  const [state, dispatch] = useContext(AppContext);

  const checkAuth = async () => {
    const userToken = await localStorage.getItem("userToken");
    await fetch(`${baseURL}/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${userToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.isAuth) {
          console.error(data.message);
          return dispatch({ type: SET_AUTH, payload: false });
        }
        dispatch({ type: SET_AUTH, payload: true });
      });
  };

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
    checkAuth();
    getSavedPlayers();
  }, []);

  return state.isAuth ? (
    <>
      <NewGameModal />
      <EndGameModal />
      <FieldContainer />
      <StatisticsContainer />
    </>
  ) : (
    <LoginComponent />
  );
};

export default App;
