export const romNum = [
  { name: "Roman num: Should correctly convert roman num.", input: "IV", expected: 4 },
  { name: "Roman num: Should correctly convert roman num.", input: "X", expected: 10 },
  { name: "Roman num: Should correctly convert roman num.", input: "VI", expected: 6 },
];

export const palindromeWords = [
  { name: "Palindrome: Should correctly check palindrome for words.", input: "Alla", expected: true },
  { name: "Palindrome: Should correctly check palindrome for numbers.", input: 121, expected: true },
];

export const brackets = [
  { name: "Brackets: Should correctly check brackets pairs.", input: "[]{}()", expected: true },
  { name: "Brackets: Should correctly check brackets closing order.", input: "([{}])", expected: true },
];

export const arrays = [
  {
    name: "Array sort: Should correctly sort array.",
    input: { arr1: [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], arr2: [2, 1, 4, 3, 9, 6] },
    expected: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19],
  },
];

export const numArr = [
  {
    name: "Num idx: Should correctly get index of requested number.",
    input: { nums: [1, 3, 5, 6], num: 5 },
    expected: 2,
  },
  {
    name: "Num idx: Should correctly get index of requested number.",
    input: { nums: [0, 1, 3, 5, 6], num: 1 },
    expected: 1,
  },
];
