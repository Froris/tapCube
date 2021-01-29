import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./styles/modals.scss";
import { SET_IS_FIRST_GAME } from "../../actions/actionsType";
import { AppContext } from "../../context/AppContext";

const NewGameModal = () => {
  const [state, dispatch] = useContext(AppContext);

  const closeModal = () => {
    dispatch({ type: SET_IS_FIRST_GAME, payload: false });
  };

  return (
    <Modal show={state.isFirstGame} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>Welcome to TapCube!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="modal-text">
          The rules are simple: just tap on the cube and get points! Try to get as many points as possible in the
          remaining time.
        </p>
        <span className="modal-text note">
          NOTE #1:
          <br />
          if you want to clear data and start a new game session - press "NEW GAME"
        </span>
        <span className="modal-text note">
          NOTE #2:
          <br />
          if you are playing with your phone, please turn the phone to landscape mode
        </span>
        <p className="modal-worning">
          <span className="worning__word">WARNING!</span> Some cubes may appear in the same place, so tap the cube
          twice.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          GOT IT!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewGameModal;
