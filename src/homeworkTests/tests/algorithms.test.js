import { assert } from "chai";

import { romNum, palindromeWords, brackets, arrays, numArr } from "../fixtures/fixturesData";
import {
  invalidRomNum,
  invalidPalindrome,
  invalidBrackets,
  invalidArrays,
  invalidNumArr,
} from "../fixtures/errorFixtures";
import gotData from "../utils/gotData";

// POSITIVE CASES *** ***
describe("Positive POST requests ---------- //", () => {
  romNum.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/rom-num", fixture.input);

      assert.equal(body.input, fixture.expected);
    });
  });

  palindromeWords.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/is-palindrome", fixture.input);

      assert.equal(body.input, fixture.expected);
    });
  });

  brackets.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/check-brackets", fixture.input);

      assert.equal(body.input, fixture.expected);
    });
  });

  arrays.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/sort-array", fixture.input);

      assert.deepEqual(body.input, fixture.expected);
    });
  });

  numArr.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/get-num-idx", fixture.input);

      assert.deepEqual(body.input, fixture.expected);
    });
  });
});

// NEGATIVE CASES *** ***
describe("Negative/Error POST requests ---------- //", () => {
  invalidRomNum.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/rom-num", fixture.input);

      assert.equal(body.input, fixture.expected);
    });
  });

  invalidPalindrome.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/is-palindrome", fixture.input);

      assert.equal(body.input, fixture.expected);
    });
  });

  invalidBrackets.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/check-brackets", fixture.input);

      assert.equal(body.input, fixture.expected);
    });
  });

  invalidArrays.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/sort-array", fixture.input);

      assert.deepEqual(body.input, fixture.expected);
    });
  });

  invalidNumArr.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData("http://localhost:3000/get-num-idx", fixture.input);

      assert.equal(body.input, fixture.expected);
    });
  });
});
