import React, { useContext, useState, useEffect } from "react";

import "./field.scss";
import CubesRender from "../cubesRender/CubesRender";
import generateCubes from "../utils/generateCubes";
import { AppContext } from "../../../context/AppContext";
import { SET_POINTS } from "../../../actions/actionsType";

const Field = () => {
  const [state, dispatch] = useContext(AppContext);
  const [cubes, setNewCubes] = useState([]);

  const setPoints = (points) => {
    dispatch({ type: SET_POINTS, payload: points });
  };

  // Создаём начальный список кубов при первом рендере
  useEffect(() => {
    setNewCubes(generateCubes(state.cubesData));
  }, []);

  return (
    <div className="field-container">
      {state.isGameStarted && <CubesRender newCubes={cubes} setPoints={setPoints} setNewCubes={setNewCubes} />}
    </div>
  );
};

export default Field;
