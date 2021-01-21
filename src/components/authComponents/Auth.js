import React, { useState } from "react";
import LoginForm from "./Login";
import RegisterForm from "./Register";

const AuthComponents = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeForm = () => {
    setIsLogin(!isLogin);
  };

  return isLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm changeForm={changeForm} />;
};

export default AuthComponents;
