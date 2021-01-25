import { useState } from "react";

const useValidator = () => {
  const [usernameErr, setUsernameErr] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [passErr, setPassErr] = useState("");

  const validateUsername = (username) => {
    const validString = /^[a-zA-Zа-яА-Я ]+([._]?[a-zA-Zа-яА-Я]+)*$/;

    setUsernameErr("");

    if (username.length === 0) {
      setUsernameErr("username must not be empty!");
      return false;
    }

    if (!validString.test(username)) {
      setUsernameErr("username must contain only numbers and characters.");
      return false;
    }

    if (username.length < 3) {
      setUsernameErr("username must be at least 3 characters length!");
      return false;
    }

    return true;
  };

  const validateLogin = (login) => {
    const validString = /^[a-z0-9]+([._]?[a-z0-9]+)*$/;

    setLoginErr("");

    if (login.length === 0) {
      setLoginErr("login must not be empty!");
      return false;
    }

    if (!validString.test(login)) {
      setLoginErr("login must contain only numbers and lowercase characters! No spaces allowed.");
      return false;
    }

    if (login.length < 4) {
      setLoginErr("login must be at least 4 characters length!");
      return false;
    }

    return true;
  };

  const validatePassword = (pass, confPass) => {
    const validPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    setPassErr("");

    if (!validPass.test(pass)) {
      setPassErr("password must be more then 5 characters, must contain at least one letter and one number.");
      return false;
    }

    if (pass !== confPass) {
      setPassErr("passwords does not match!");
      return false;
    }

    return true;
  };

  return [usernameErr, loginErr, passErr, validateUsername, validateLogin, validatePassword];
};

export default useValidator;
