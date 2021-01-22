import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "./popup-list.scss";
import { AppContext } from "../../../context/AppContext";
import Player from "./Player";
import { makeGetRequest, makePostRequest } from "../../utils/makeFetchRequest";
import { SET_CURRENT_PLAYER } from "../../../actions/actionsType";

const PopupList = ({ isShown, onCloseHandler }) => {
  const [state, dispatch] = useContext(AppContext);
  const [page, setPage] = useState([]);
  const [pagesCount, setPagesCount] = useState();
  const [pageNum, setPageNum] = useState(0);

  const setNewPage = (e) => {
    setPageNum(e.target.id);
  };

  const makePagination = () => {
    const paginationButtons = [];
    for (let i = 0; i < pagesCount; i++) {
      let num = i + 1;
      const button = (
        <button key={i} className="pagination-btn" id={i} onClick={setNewPage}>
          {num}
        </button>
      );
      paginationButtons.push(button);
    }
    return paginationButtons;
  };

  const getPages = () => {
    makeGetRequest(`/list?page=${pageNum}`).then((response) => {
      if (response.error) {
        return console.error(response.error);
      }

      setPagesCount(response.pagesCount);
      setPage(response.page);
    });
  };

  useEffect(() => {
    getPages();
  }, [pageNum]);

  const makeAdmin = (playerLogin) => {
    makePostRequest(
      { apiUrl: `/set-admin`, data: { newAdminLogin: playerLogin, currAdminLogin: state.currentPlayer.login } },
      { "Content-Type": "application/json" }
    ).then((response) => {
      if (response.error) {
        console.error(response.error);
        return;
      }

      dispatch({ type: SET_CURRENT_PLAYER, payload: response.result });
      localStorage.setItem("currentPlayer", JSON.stringify(response.result));
    });
  };

  return (
    <Modal show={isShown} onHide={onCloseHandler} className="players-popup">
      <Modal.Header>
        <Modal.Title>Players list</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {page && (
          <ul className="players-list">
            {page.map((player, i) => {
              return <Player key={i} playerInfo={player} onClickHandler={makeAdmin} />;
            })}
          </ul>
        )}
        <div className="pagination">{makePagination()}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseHandler}>
          CLOSE
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupList;
