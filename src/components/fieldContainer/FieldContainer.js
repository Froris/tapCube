import React from "react";

import "./field-container.scss";
import Field from "./field/Field";
import AppTitle from "../appTitle/AppTitle";
import FieldHeader from "./fieldHeader/FieldHeader";

const FieldContainer = () => {
  return (
    <div className="main-container">
      <AppTitle title="TapCube!" />
      <FieldHeader />
      <Field />
    </div>
  );
};

export default FieldContainer;
