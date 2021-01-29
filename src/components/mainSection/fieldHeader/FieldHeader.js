import React, { useContext } from "react";

import "../styles/field-header.scss";

import AppButton from "../../buttons/AppButton";
import Points from "./Points";
import Timer from "./timer/Timer";
import { AppContext } from "../../../context/AppContext";

import {
  SET_GAME_END,
  SET_GAME_PAUSE,
  SET_GAME_START,
  SET_GAME_RESTART,
  SET_NEW_GAME,
  CLEAR_POINTS,
} from "../../../actions/actionsType";
import { makeGetRequest } from "../../utils/makeFetchRequest";

const FieldHeader = () => {
  const [state, dispatch] = useContext(AppContext);

  const onStartGameRound = () => {
    dispatch({ type: SET_GAME_START, payload: true });
    dispatch({ type: SET_GAME_END, payload: false });
  };

  const onEndGameRound = () => {
    dispatch({ type: SET_GAME_START, payload: false });
    dispatch({ type: SET_GAME_END, payload: true });
  };

  const onNewGame = () => {
    makeGetRequest("/new-game").then((response) => {
      if (response.error) {
        console.error(response.error);
      }

      dispatch({ type: SET_NEW_GAME });
      document.location.reload();
    });
  };

  const onRestart = () => {
    dispatch({ type: SET_GAME_RESTART, payload: true });
    dispatch({ type: SET_GAME_START, payload: false });
    dispatch({ type: CLEAR_POINTS });
    dispatch({ type: SET_GAME_PAUSE, payload: false });
  };

  const pauseGame = () => {
    dispatch({ type: SET_GAME_PAUSE, payload: !state.isGamePaused });
  };

  return (
    <div className="field-header">
      <div className="buttons-container">
        {state.isGameStarted ? (
          <>
            <AppButton text="PAUSE" className="btn-pause" onClickHandler={pauseGame} />
            <AppButton text="RESTART" className="btn-restart" onClickHandler={onRestart} />
          </>
        ) : (
          <>
            <AppButton
              text="START"
              isDisabled={state.isGameStarted}
              className="btn-start"
              onClickHandler={onStartGameRound}
            />
            <AppButton text="NEW GAME" className="btn-new-game" onClickHandler={onNewGame} />
          </>
        )}
      </div>
      <Points points={state.points} />
      <Timer time={{ hours: 0, minutes: 1, seconds: 0 }} timeUpHandler={onEndGameRound} />
    </div>
  );
};

export default FieldHeader;
