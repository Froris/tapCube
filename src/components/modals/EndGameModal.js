import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import "./styles/modals.scss";
import { CLEAR_POINTS, SET_GAME_END, SET_CURRENT_PLAYER, UPDATE_PLAYERS_LIST } from "../../actions/actionsType";
import { AppContext } from "../../context/AppContext";
import { makePostRequest } from "../utils/makeFetchRequest";

const EndGameModal = () => {
  const [state, dispatch] = useContext(AppContext);

  const onClose = () => {
    dispatch({ type: CLEAR_POINTS });
    dispatch({ type: SET_GAME_END, payload: false });
  };

  const savePlayer = () => {
    const { role, username, login, IP, registerDate } = state.currentPlayer;
    const currentMax = state.currentPlayer.maxScore;
    const updatedMax = currentMax > state.points ? currentMax : state.points;

    const currentPlayer = {
      role,
      username: username,
      login: login,
      registerDate,
      IP,
      score: state.points,
      maxScore: updatedMax,
      gamesCount: state.currentPlayer.gamesCount + 1,
    };

    // список игроков отправляем на сервер
    makePostRequest({ apiUrl: "/save", data: currentPlayer }, { "Content-Type": "application/json" }).then(
      (response) => {
        if (response.error) {
          return console.error(response.error);
        }

        // сервер возвращает список всех игроков и текущего, который мы передаём в store
        localStorage.setItem("currentPlayer", JSON.stringify(response.savedPlayer));
        dispatch({ type: SET_CURRENT_PLAYER, payload: response.savedPlayer });
        dispatch({ type: UPDATE_PLAYERS_LIST, payload: response.list });
        return;
      }
    );

    dispatch({ type: SET_GAME_END, payload: false });
    dispatch({ type: CLEAR_POINTS });
  };

  return (
    <Modal show={state.isGameEnded} onHide={onClose}>
      <Modal.Header>
        <Modal.Title>Time is up!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="modal-text">
          Good job, {state.currentPlayer.username}! You`ve earned{" "}
          <span className="text__points">{state.points}</span> points!
        </p>
        <span className="modal-text note">press anywhere to continue without saving</span>
      </Modal.Body>
      <Modal.Footer>
        <InputGroup className="mb-3">
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={savePlayer}>
              <span className="save-text">SAVE RESULTS</span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default EndGameModal;
