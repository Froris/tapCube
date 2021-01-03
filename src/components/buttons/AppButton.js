import React from "react";
import Button from "react-bootstrap/Button";

const AppButton = ({ className, text, onClickHandler, isDisabled }) => {
  return (
    <Button
      type="button"
      variant="outline-primary"
      className={className}
      onClick={onClickHandler}
      disabled={isDisabled}
    >
      {text}
    </Button>
  );
};

export default AppButton;
