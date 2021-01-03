import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./cube.scss";
import { AppContext } from "../../../context/AppContext";
import generateCubes from "../utils/generateCubes";

const CubesRender = ({ newCubes, setPoints, setNewCubes }) => {
  const [state] = useContext(AppContext);
  const [cubesList, updateCubesList] = useState(newCubes);

  // Если в массиве отображаемых кубов остался один:
  // Вызываем генератор и обновляем список отображаемых кубов.
  // Если кубов несколько - фильтруем массив и убираем тот, на который навели курсор.
  const cubesUpdater = (id) => {
    if (cubesList.length && id) {
      if (cubesList.length === 1) {
        setNewCubes(generateCubes(state.cubesData));
        updateCubesList(newCubes);
      } else if (cubesList.length > 1) {
        const newArr = cubesList.filter((cube) => {
          return cube.id !== id;
        });
        updateCubesList(newArr);
      }
    }
  };

  const onMouseOverHandler = (points, id) => {
    if (!state.isGamePaused) {
      setPoints(points);
      cubesUpdater(id);
    }

    return;
  };

  return cubesList.map((cube, index) => {
    const cubeClass = classNames({
      cube: true,
      regular: cube.type === "regular",
      rare: cube.type === "rare",
      gold: cube.type === "ssr",
    });

    return (
      <div
        key={index}
        className={cubeClass}
        style={{ ...cube.position }}
        onClick={() => {
          onMouseOverHandler(cube.points, cube.id);
        }}
      ></div>
    );
  });
};

export default CubesRender;

CubesRender.propTypes = {
  newCubes: PropTypes.array,
  setPoints: PropTypes.func,
  setNewCubes: PropTypes.func,
};
