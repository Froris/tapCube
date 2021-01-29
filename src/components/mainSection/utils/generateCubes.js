import getRandomNum from "./getRandomNum";

const generatePosition = () => {
  const randomPosition = {
    top: getRandomNum(5, 70) + "%",
    bottom: getRandomNum(5, 70) + "%",
    right: getRandomNum(5, 70) + "%",
    left: getRandomNum(5, 70) + "%",
  };

  return randomPosition;
};

/**
 *
 * @param {шаблоны кубов в массиве} data
 * @param {тип искомого шаблона куба} cubeType
 */
const getCubeByType = (data, cubeType) => {
  const cube = data.find((cube) => cube.type === cubeType);
  const newCube = { ...cube };
  if (cube) {
    newCube.position = generatePosition();
    newCube.id = getRandomNum(1, 9000000);
  } else {
    console.error("Didn`t find any cube by cube type");
  }

  return newCube;
};

/**
 *
 * @param {массив с шаблонами кубов} cubesData
 */
const generateCubes = (cubesData) => {
  const createdCubes = [];
  const cubesAmount = getRandomNum(1, 3);
  let cubeType;
  let cubeParams;
  let randomNum;

  // Достаём шаблоны кубов согласно типу
  for (let i = 1; i <= cubesAmount; i++) {
    randomNum = getRandomNum(1, 100);
    // Определяем тип куба (cubeType) зависимо от randomNum
    if (randomNum <= 60) {
      cubeType = "regular";
      cubeParams = getCubeByType(cubesData, cubeType);
      createdCubes.push(cubeParams);
    }

    if (randomNum >= 61 && randomNum <= 80) {
      cubeType = "rare";
      cubeParams = getCubeByType(cubesData, cubeType);
      createdCubes.push(cubeParams);
    }

    if (randomNum >= 81) {
      cubeType = "ssr";
      cubeParams = getCubeByType(cubesData, cubeType);
      createdCubes.push(cubeParams);
    }
  }

  return createdCubes;
};

export default generateCubes;
