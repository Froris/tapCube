import React, { useContext } from "react";
import { SET_AUTH } from "../../actions/actionsType";
import { AppContext } from "../../context/AppContext";

import "./styles/logout.scss";

const Logout = () => {
  const [, dispatch] = useContext(AppContext);

  const logout = () => {
    localStorage.clear();
    dispatch({ type: SET_AUTH, payload: false });
    document.location.reload();
  };

  return (
    <button className="logout-btn" onClick={logout}>
      <span>LOGOUT</span>
    </button>
  );
};

export default Logout;
