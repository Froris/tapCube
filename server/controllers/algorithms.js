const useValidator = require("../utils/validators");

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

const isPalindrome = (input) => {
  if (typeof input === "string") {
    input = input.toLowerCase();
    const charactersArr = input.split("");

    // Проверка на валидность
    if (!useValidator.palindromeValidator(input)) throw new Error("Provided string must contain characters only.");

    // Проверка на полиндром
    if (charactersArr.join("") === charactersArr.reverse().join("")) return true;
    return false;
  }

  // Проверка цифр
  const numsArr = input.toString().split("");

  if (!useValidator.palindromeValidator(input)) throw new Error("Provided value must contain numbers only.");

  if (numsArr.join("") === numsArr.reverse().join("")) return true;
  return false;
};

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

exports.convertRomNum = convertRomNum;
exports.isPalindrome = isPalindrome;
exports.bracketsChecker = bracketsChecker;
exports.sortArr = sortArr;
exports.getNumIdx = getNumIdx;
