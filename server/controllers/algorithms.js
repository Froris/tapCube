const useValidator = require("../utils/validators");
const ValidExcep = require("../utils/userExceptions");
const errorHandler = require("../utils/errorHandler");

const romNumController = (req, res) => {
  const convertRomNum = (romNum) => {
    useValidator.romNumValidator(romNum);

    const romanChr = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let num = romanChr[romNum.charAt(0)];
    let pre, curr;

    for (var i = 1; i < romNum.length; i++) {
      curr = romanChr[romNum.charAt(i)];
      pre = romanChr[romNum.charAt(i - 1)];

      if (curr && pre && curr <= pre) {
        num += curr;
      } else if (curr >= pre) {
        num = num - pre * 2 + curr;
      }
    }

    return num;
  };

  try {
    const romNum = req.body.input;
    const convertedNum = convertRomNum(romNum);
    if (!convertedNum) throw Error("Rom num: Internal Server Error, something went wrong.");
    res.send({ result: convertedNum });
  } catch (error) {
    errorHandler(error, res);
  }
};

const palindromeController = (req, res) => {
  const isPalindrome = (input) => {
    if (!input) throw new ValidExcep("Provided input must not be empty.");

    if (typeof input === "string") {
      useValidator.palindromeValidator(input);

      input = input.toLowerCase();
      const charactersArr = input.split("");

      // Проверка на полиндром
      if (charactersArr.join("") === charactersArr.reverse().join("")) return true;
      return false;
    }

    // Проверка цифр
    useValidator.palindromeValidator(input);
    const numsArr = input.toString().split("");

    if (numsArr.join("") === numsArr.reverse().join("")) return true;
    return false;
  };

  try {
    const word = req.body.input;
    const result = isPalindrome(word);
    if (result == undefined) throw Error("Palindrome: Internal Server Error, something went wrong.");
    res.send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};

const bracketsController = (req, res) => {
  const bracketsChecker = (input) => {
    const bracketsList = "[]{}()";
    const closBrackIdx = [];

    useValidator.bracketsValidator(input);

    for (let bracket of input) {
      let brackIdx = bracketsList.indexOf(bracket);
      if (brackIdx % 2 === 0) closBrackIdx.push(brackIdx + 1);
      else if (closBrackIdx.pop() !== brackIdx) {
        return false;
      }
    }

    // Если все скобки имеют пару, в массиве ничего не останется
    return closBrackIdx.length === 0;
  };

  try {
    const brackets = req.body.input;
    const result = bracketsChecker(brackets);
    if (result == undefined) throw Error("Check brackets: Internal Server Error, something went wrong.");
    res.send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};

const sortArrController = (req, res) => {
  const sortArr = (arr1, arr2) => {
    const firstHalf = [];
    const secondHalf = [...arr1];

    useValidator.arraysValidator(arr1, arr2);

    arr2.forEach((e2) => {
      arr1.forEach((e1) => {
        if (e1 === e2) {
          idx = secondHalf.indexOf(e1);
          firstHalf.push(e1);
          secondHalf.splice(idx, 1);
        }
      });
    });

    return firstHalf.concat(secondHalf.sort().reverse());
  };

  try {
    const firstArr = req.body.input.arr1;
    const secondArr = req.body.input.arr2;
    const result = sortArr(firstArr, secondArr);
    if (!result || result.length === 0) throw Error("Sort arrays: Internal Server Error, something went wrong.");
    res.send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getIdxController = (req, res) => {
  const getNumIdx = (numArr, num) => {
    useValidator.numIdxValidator(numArr, num);

    let requestedIdx = numArr.indexOf(num);
    if (requestedIdx > -1) return requestedIdx;
    else {
      numArr.some((currNum, idx) => {
        if (num > currNum && num < numArr[idx + 1]) {
          requestedIdx = idx + 1;
          return true;
        } else {
          requestedIdx = idx;
          return true;
        }
      });

      return requestedIdx;
    }
  };

  try {
    const numArr = req.body.input.nums;
    const num = req.body.input.num;
    const result = getNumIdx(numArr, num);
    if (result == undefined) throw Error("Get num idx: Internal Server Error, something went wrong.");
    res.send({ result: result });
  } catch (error) {
    errorHandler(error, res);
  }
};

exports.romNumController = romNumController;
exports.palindromeController = palindromeController;
exports.bracketsController = bracketsController;
exports.sortArrController = sortArrController;
exports.getIdxController = getIdxController;
