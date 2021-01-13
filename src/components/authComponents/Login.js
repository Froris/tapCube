import React, { useState, useContext } from "react";
import { SET_AUTH } from "../../actions/actionsType";
import { AppContext } from "../../context/AppContext";

import { baseURL } from "../../index";

import "./login.scss";

const LoginComponent = () => {
  const [, dispatch] = useContext(AppContext);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("qwerty");

  const postData = async (e) => {
    e.preventDefault();
    const userData = { username, password };

    await fetch(`${baseURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isAuth) {
          localStorage.setItem("userToken", data.token);
          dispatch({ type: SET_AUTH, payload: true });
        }
      });
  };

  return (
    <div className="login__container">
      <h1 className="login__title">Welcome to TapCube!</h1>
      <span>In order to play this game you must be logged in.</span>
      <form className="login__form" onSubmit={postData}>
        <input type="text" name="login" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="LOG IN" />
      </form>
    </div>
  );
};

export default LoginComponent;
