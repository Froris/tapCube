import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

import "./modals.scss";
import { baseURL } from "../../index";
import { CLEAR_POINTS, SAVE_LAST_PLAYER, SAVE_PLAYER, SET_GAME_END } from "../../actions/actionsType";
import { AppContext } from "../../context/AppContext";

const EndGameModal = () => {
  const [state, dispatch] = useContext(AppContext);
  const [playerName, setName] = useState("");

  const setPlayerName = (e) => {
    setName(e.target.value);
  };

  const onClose = () => {
    dispatch({ type: CLEAR_POINTS });
    dispatch({ type: SET_GAME_END, payload: false });
  };

  const savePlayers = () => {
    const currentPlayer = { name: playerName, points: state.points };
    const players = [...state.players];
    players.push(currentPlayer);

    // Отправляем обновлённый список игроков для сохранения
    // В ответ получаем отсортированный список
    fetch(`${baseURL}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playersList: players, lastPlay: currentPlayer }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) console.error(data.error);
        else {
          dispatch({ type: SAVE_PLAYER, payload: data.playersList });
          dispatch({ type: SAVE_LAST_PLAYER, payload: data.lastPlay });
        }
      });

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
          Good job! You`ve earned <span className="text__points">{state.points}</span> points!
        </p>
        <span className="modal-text note">press anywhere to continue without saving</span>
      </Modal.Body>
      <Modal.Footer>
        <InputGroup className="mb-3">
          <FormControl
            onChange={setPlayerName}
            placeholder="Enter name... (default: Player)"
            aria-label="Enter name... (default: Player)"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={savePlayers}>
              <span className="save-text">SAVE RESULTS</span>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
};

export default EndGameModal;
