const ValidExcep = require("./userExceptions");

const romNumValidator = (input) => {
  const romanRegexp = /^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

  if (typeof input !== "string" || input.length < 1) {
    throw new ValidExcep("Please provide not empty string.");
  }

  if (!romanRegexp.test(input)) throw new ValidExcep("Error! Input string must contain roman numerals.");
};

const palindromeValidator = (input) => {
  const validChars = /^[a-zA-Zа-яА-Я]+$/;
  const validateNums = /^[0-9+(),-]+$/;
  let isValid;

  if (typeof input === "string") {
    isValid = validChars.test(input);
    if (isValid) return true;
    throw new ValidExcep("Provided string must contain characters only.");
  }

  isValid = validateNums.test(input);
  if (isValid) return true;
  throw new ValidExcep("Provided value must contain numbers only.");
};

const bracketsValidator = (input) => {
  if (typeof input !== "string") {
    throw new ValidExcep("Input must be a string.");
  } else if (input.length <= 1 || input.length > 104) {
    throw new ValidExcep("Input value must be between 2 and 104 symbols length.");
  }
};

const arraysValidator = (arr1, arr2) => {
  if (arr1.length < 2 || arr2.length > 1000) {
    throw new ValidExcep("Arrays length must be more then 1 and less then 1000.");
  }

  for (let value of arr1) {
    if (typeof value === "string") throw new ValidExcep("Arrays must contain only numbers.");
  }

  for (let value of arr2) {
    if (typeof value === "string") throw new ValidExcep("Arrays must contain only numbers.");
  }
};

const numIdxValidator = (numArr, num) => {
  for (let value of numArr) {
    if (typeof value === "string") throw new ValidExcep("Array must contain only numbers.");
  }

  if (typeof num === "string") throw new ValidExcep("Second argument must be a number.");
};

exports.romNumValidator = romNumValidator;
exports.palindromeValidator = palindromeValidator;
exports.bracketsValidator = bracketsValidator;
exports.arraysValidator = arraysValidator;
exports.numIdxValidator = numIdxValidator;
