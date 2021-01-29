import React, { useContext, useState, useEffect } from "react";

import "./styles/field.scss";
import CubesRender from "./CubesRender";
import generateCubes from "./utils/generateCubes";
import { AppContext } from "../../context/AppContext";
import { SET_POINTS } from "../../actions/actionsType";

const Field = () => {
  const [state, dispatch] = useContext(AppContext);
  const [cubes, setNewCubes] = useState([]);

  const setPoints = (type) => {
    const tappedCube = cubes.find((cube) => cube.type === type);
    dispatch({ type: SET_POINTS, payload: tappedCube.points });
  };

  // Если в массиве отображаемых кубов остался один:
  // Вызываем генератор и обновляем список отображаемых кубов.
  // Если кубов несколько - фильтруем массив и убираем тот, на который навели курсор.
  const cubesListUpdater = (id) => {
    const cubeId = parseInt(id, 10);
    if (cubes.length && cubeId) {
      if (cubes.length === 1) {
        setNewCubes(generateCubes(state.cubesData));
      } else if (cubes.length > 1) {
        const newArr = cubes.filter((cube) => {
          return cube.id !== cubeId;
        });
        setNewCubes(newArr);
      }
    }
  };

  const onMouseClickHandler = (e) => {
    const cubeClassName = e.target.className;
    if (cubeClassName.includes("cube")) {
      const cubeType = cubeClassName.split(" ")[1];
      const cubeId = e.target.id;

      if (!state.isGamePaused) {
        setPoints(cubeType);
        cubesListUpdater(cubeId);
      }
    }
    return;
  };

  // Создаём начальный список кубов при первом рендере
  useEffect(() => {
    setNewCubes(generateCubes(state.cubesData));
  }, []);

  return (
    <div className="field-container" onClick={onMouseClickHandler}>
      {state.isGameStarted && <CubesRender newCubes={cubes} />}
    </div>
  );
};

export default Field;
