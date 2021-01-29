import React, { useContext, useEffect } from "react";

import "./app.scss";

import SideContainer from "../sideSection/SideContainer";
import { AppContext } from "../../context/AppContext";
import MainContainer from "../mainSection/MainContainer";
import NewGameModal from "../modals/NewGameModal";
import EndGameModal from "../modals/EndGameModal";
import { SET_AUTH, SET_CURRENT_PLAYER, UPDATE_PLAYERS_LIST } from "../../actions/actionsType";
import AuthComponents from "../authComponents/Auth";
import { makePostRequest, makeGetRequest } from "../utils/makeFetchRequest";

const App = () => {
  const [state, dispatch] = useContext(AppContext);

  // Проверка авторизации
  const checkAuth = async () => {
    const userToken = await localStorage.getItem("userToken");

    // Если нет токена - юзер не залогинен/зареган
    if (userToken === null || userToken === undefined) {
      dispatch({ type: SET_AUTH, payload: false });
    }

    // Проверяем авторизацию текущего игрока и сохраняем его в localStorage
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
    makeGetRequest("/get-players").then((response) => {
      if (response.error) {
        return console.error(response.error);
      }

      dispatch({ type: UPDATE_PLAYERS_LIST, payload: response.list });
    });
  };

  useEffect(() => {
    checkAuth();
    checkSavedPlayers();
  }, []);

  return state.isAuth ? (
    <>
      <NewGameModal />
      <EndGameModal />
      <MainContainer />
      <SideContainer />
    </>
  ) : (
    <AuthComponents />
  );
};

export default App;
