import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./styles/cube.scss";

const CubesRender = ({ newCubes }) => {
  const [cubesList, updateCubesList] = useState(newCubes);

  useEffect(() => {
    updateCubesList(newCubes);
  }, [newCubes]);

  // Выводим кубы из списка
  return cubesList.map((cube, index) => {
    const cubeClass = classNames({
      cube: true,
      regular: cube.type === "regular",
      rare: cube.type === "rare",
      ssr: cube.type === "ssr",
    });

    return <div key={index} className={cubeClass} style={{ ...cube.position }} id={cube.id}></div>;
  });
};

export default CubesRender;

CubesRender.propTypes = {
  newCubes: PropTypes.array,
};
