import React from "react";

import "./styles/field-container.scss";
import Field from "./Field";
import AppTitle from "./AppTitle";
import FieldHeader from "./fieldHeader/FieldHeader";

const MainContainer = () => {
  return (
    <div className="main-container">
      <AppTitle title="TapCube!" />
      <FieldHeader />
      <Field />
    </div>
  );
};

export default MainContainer;
