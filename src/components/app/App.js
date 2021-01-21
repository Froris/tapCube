import React, { useContext, useEffect } from "react";

import "./app.scss";

import StatisticsContainer from "../statisticsContainer/StatisticsContainer";
import { AppContext } from "../../context/AppContext";
import FieldContainer from "../fieldContainer/FieldContainer";
import NewGameModal from "../modals/NewGameModal";
import EndGameModal from "../modals/EndGameModal";
import { SET_AUTH, SET_CURRENT_PLAYER, UPDATE_PLAYERS_LIST } from "../../actions/actionsType";
import AuthComponents from "../authComponents/Auth";
import makePostRequest from "../utils/makePostRequest";

const App = () => {
  const [state, dispatch] = useContext(AppContext);

  // Проверка авторизации
  const checkAuth = async () => {
    const userToken = await localStorage.getItem("userToken");

    if (userToken === null || userToken === undefined) {
      dispatch({ type: SET_AUTH, payload: false });
    }

    makePostRequest({ apiUrl: "/" }, { Authorization: `Bearer ${userToken}` }).then((response) => {
      if (response.error) {
        console.error(response.error);
        return dispatch({ type: SET_AUTH, payload: false });
      }

      const currentPlayer = JSON.parse(localStorage.getItem("currentPlayer"));
      dispatch({ type: SET_AUTH, payload: true });
      dispatch({ type: SET_CURRENT_PLAYER, payload: currentPlayer });
    });
  };

  // Получение списка игроков при первом запуске
  const checkSavedPlayers = () => {
    const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3001" : "";
    fetch(`${baseURL}/get-players`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          return console.error(data.error);
        }

        dispatch({ type: UPDATE_PLAYERS_LIST, payload: data.list });
      });
  };

  useEffect(() => {
    checkAuth();
    checkSavedPlayers();
    console.log(state.currentPlayer);
  }, []);

  return state.isAuth ? (
    <>
      <NewGameModal />
      <EndGameModal />
      <FieldContainer />
      <StatisticsContainer />
    </>
  ) : (
    <AuthComponents />
  );
};

export default App;
