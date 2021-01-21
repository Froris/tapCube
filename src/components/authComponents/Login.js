import React, { useState, useContext } from "react";
import moment from "moment";
import { SET_AUTH, SET_CURRENT_PLAYER } from "../../actions/actionsType";
import { AppContext } from "../../context/AppContext";

import "./auth.scss";
import makePostRequest from "../utils/makePostRequest";

const LoginForm = ({ changeForm }) => {
  const [, dispatch] = useContext(AppContext);
  const [login, setLogin] = useState("admin");
  const [password, setPassword] = useState("qwertyui1");
  const [error, setError] = useState("");

  const postData = (e) => {
    e.preventDefault();
    const userData = { login, password };

    makePostRequest({ apiUrl: "/auth/login", data: userData }, { "Content-Type": "application/json" }).then(
      (response) => {
        if (response.error) {
          setError(response.error);
          return dispatch({ type: SET_AUTH, payload: false });
        }

        const { _id, role, username, login, token, IP, registerDate, maxScore, gamesCount } = response;

        const recievedPlayer = {
          _id,
          role,
          username,
          login,
          IP,
          registerDate: moment(registerDate).format("DDDo, MMM, YYYY"),
          maxScore,
          gamesCount,
        };

        localStorage.setItem("userToken", token);
        localStorage.setItem("currentPlayer", JSON.stringify(recievedPlayer));

        dispatch({
          type: SET_CURRENT_PLAYER,
          payload: { ...recievedPlayer, score: 0 },
        });
        dispatch({ type: SET_AUTH, payload: true });
      }
    );
  };

  return (
    <div className="login__container">
      <h1 className="login__title">Welcome to TapCube!</h1>
      <span>In order to play this game you must be logged in.</span>
      <form className="login__form" onSubmit={postData}>
        {error && <span className="error-message">{error}</span>}
        <input
          type="text"
          name="login"
          placeholder="login ..."
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password ..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="LOG IN" />
      </form>
      <div className="change-form">
        <span>
          Don`t have an account?{" "}
          <span className="change-form-btn" onClick={changeForm}>
            Create one!
          </span>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
