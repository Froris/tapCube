const romNumValidator = (input) => {
  const romanRegexp = /^(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)$/;

  if (typeof input !== "string" || input.length < 1) {
    throw new Error("Please provide not empty string.");
  }

  if (!romanRegexp.test(input)) throw new Error("Error! Input string must contain roman numerals.");
};

const palindromeValidator = (input) => {
  const validChars = /^[a-zA-Zа-яА-Я]+$/;
  const validateNums = /^[0-9+(),-]+$/;

  if (typeof input === "string") {
    return validChars.test(input);
  }

  return validateNums.test(input);
};

const bracketsValidator = (input) => {
  if (typeof input !== "string") {
    throw new Error("Input must be a string.");
  } else if (input.length <= 1 || input.length > 104) {
    throw new Error("Input value must be between 2 and 104 symbols length.");
  }
};

const arraysValidator = (arr1, arr2) => {
  if (arr1.length < 2 || arr2.length > 1000) {
    throw new Error("Arrays length must be more then 1 and less then 1000.");
  }

  for (let value of arr1) {
    if (typeof value === "string") throw new Error("Arrays must contain only numbers.");
  }

  for (let value of arr2) {
    if (typeof value === "string") throw new Error("Arrays must contain only numbers.");
  }
};

const numIdxValidator = (numArr, num) => {
  for (let value of numArr) {
    if (typeof value === "string") throw new Error("Array must contain only numbers.");
  }

  if (typeof num === "string") throw new Error("Second argument must be a number.");
};

exports.romNumValidator = romNumValidator;
exports.palindromeValidator = palindromeValidator;
exports.bracketsValidator = bracketsValidator;
exports.arraysValidator = arraysValidator;
exports.numIdxValidator = numIdxValidator;
