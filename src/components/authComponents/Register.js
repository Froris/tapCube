import React, { useState, useContext } from "react";
import moment from "moment";

import { SET_AUTH, SET_CURRENT_PLAYER } from "../../actions/actionsType";
import { AppContext } from "../../context/AppContext";
import useValidator from "../../hooks/useValidator";
import { makePostRequest } from "../utils/makeFetchRequest";

import "./styles/auth.scss";

const RegisterForm = ({ changeForm }) => {
  const [, dispatch] = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [usernameErr, loginErr, passErr, validateUsername, validateLogin, validatePassword] = useValidator();
  const [response, setResponse] = useState();

  const postData = async (e) => {
    setResponse("");
    e.preventDefault();

    const checkValidity = new Promise((res, rej) => {
      const validUsername = validateUsername(username);
      const validLogin = validateLogin(login);
      const validPass = validatePassword(password, confirmedPassword);
      if (validPass && validLogin && validUsername) {
        return res({
          role: "gamer",
          username,
          login,
          password,
        });
      }
      return rej("Invalid data");
    });

    checkValidity
      .then((createdUser) => {
        makePostRequest(
          { apiUrl: "/auth/register", data: createdUser },
          { "Content-Type": "application/json" }
        ).then((response) => {
          if (response.error) {
            return setResponse(response);
          }

          const { _id, role, username, login, token, IP, registerDate } = response;

          const recievedPlayer = {
            _id,
            role,
            username,
            login,
            IP,
            registerDate,
            score: 0,
            maxScore: 0,
            gamesCount: 0,
          };

          localStorage.setItem("userToken", token);
          localStorage.setItem("currentPlayer", JSON.stringify(recievedPlayer));

          dispatch({
            type: SET_CURRENT_PLAYER,
            payload: recievedPlayer,
          });
          dispatch({ type: SET_AUTH, payload: true });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="register__container">
      <h1 className="register__title">Register new account</h1>
      <form className="register__form" onSubmit={postData}>
        {response?.error && <span className="error-message">{response.error}</span>}
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username ..."
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameErr && <span className="error-message">{usernameErr}</span>}
        <input
          type="text"
          name="login"
          value={login}
          placeholder="login ..."
          onChange={(e) => setLogin(e.target.value)}
        />
        {loginErr && <span className="error-message">{loginErr}</span>}
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password ..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {passErr && <span className="error-message">{passErr}</span>}
        <input
          type="password"
          name="confirmed password"
          placeholder="confirm password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <input type="submit" value="CREATE" />
      </form>
      <div className="change-form">
        <span>
          Already have an account?{" "}
          <span className="change-form-btn" onClick={changeForm}>
            Log in!
          </span>
        </span>
      </div>
    </div>
  );
};

export default RegisterForm;
