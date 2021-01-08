export const invalidRomNum = [
  {
    name: "Rom num: Should return error message if string is empty.",
    input: "",
    expected: "Please provide not empty string.",
  },
  {
    name: "Rom num: Should return error message if not a roman num.",
    input: "Xg1",
    expected: "Error! Input string must contain roman numerals.",
  },
];

export const invalidPalindrome = [
  {
    name: "Palindrome: Should return error message if string contains numbers.",
    input: "11a11",
    expected: "Provided string must contain characters only.",
  },
  { name: "Palindrome: Should return false if word is not palindrome.", input: "Alex", expected: false },
  { name: "Palindrome: Should return false if number is not palindrome.", input: 112, expected: false },
];

export const invalidBrackets = [
  {
    name: "Barckets: Should return error message if input is not a string.",
    input: 12,
    expected: "Input must be a string.",
  },
  {
    name: "Brackets: Should return error message if input length < 2.",
    input: "(",
    expected: "Input value must be between 2 and 104 symbols length.",
  },
];

export const invalidArrays = [
  {
    name: "Array sort: Should return error message if array length < 1 || length > 1000",
    input: { arr1: [2], arr2: [2, 1, 4, 3, 9, 6] },
    expected: "Arrays length must be more then 1 and less then 1000.",
  },
  {
    name: "Array sort: Should return error message if array contains chars.",
    input: { arr1: [2, "a"], arr2: [2, 1, 4, 3, 9, 6] },
    expected: "Arrays must contain only numbers.",
  },
  {
    name: "Array sort: Should return error message if array contains chars.",
    input: { arr1: [2, 3], arr2: [2, 1, 4, 3, "v", 6] },
    expected: "Arrays must contain only numbers.",
  },
];

export const invalidNumArr = [
  {
    name: "Num idx: Should return error message if array contains string.",
    input: { nums: [1, "a", 5, 6], num: 5 },
    expected: "Array must contain only numbers.",
  },
  {
    name: "Num idx: Should return error message if provided num is a string.",
    input: { nums: [0, 1, 3, 5, 6], num: "s" },
    expected: "Second argument must be a number.",
  },
];
