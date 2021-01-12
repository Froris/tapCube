import { assert } from "chai";

import { romNum, palindromeWords, brackets, arrays, numIdx } from "../fixtures/fixturesData";
import { romNumPath, palindromePath, bracketsPath, arraysPath, numIdxPath } from "../paths/algorithmsPath";
import {
  invalidRomNum,
  invalidPalindrome,
  invalidBrackets,
  invalidArrays,
  invalidNumIdx,
} from "../fixtures/errorFixtures";
import gotData from "../utils/gotData";

// POSITIVE CASES *** ***
describe("Positive POST requests ---------- //", () => {
  romNum.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData(romNumPath, fixture.input);

      assert.equal(body.result, fixture.expected);
    });
  });

  palindromeWords.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData(palindromePath, fixture.input);

      assert.equal(body.result, fixture.expected);
    });
  });

  brackets.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData(bracketsPath, fixture.input);

      assert.equal(body.result, fixture.expected);
    });
  });

  arrays.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData(arraysPath, fixture.input);

      assert.deepEqual(body.result, fixture.expected);
    });
  });

  numIdx.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      const { body } = await gotData(numIdxPath, fixture.input);

      assert.deepEqual(body.result, fixture.expected);
    });
  });
});

// NEGATIVE CASES *** ***
describe("Negative/Error POST requests ---------- //", () => {
  invalidRomNum.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      try {
        await gotData(romNumPath, fixture.input);
      } catch (error) {
        const { result } = error.response.body;
        assert.equal(result, fixture.expected);
      }
    });
  });

  invalidPalindrome.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      try {
        await gotData(palindromePath, fixture.input);
      } catch (error) {
        const { result } = error.response.body;
        assert.equal(result, fixture.expected);
      }
    });
  });

  invalidBrackets.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      try {
        await gotData(bracketsPath, fixture.input);
      } catch (error) {
        const { result } = error.response.body;
        assert.equal(result, fixture.expected);
      }
    });
  });

  invalidArrays.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      try {
        await gotData(arraysPath, fixture.input);
      } catch (error) {
        const { result } = error.response.body;
        assert.equal(result, fixture.expected);
      }
    });
  });

  invalidNumIdx.forEach((fixture) => {
    return it(`${fixture.name}`, async () => {
      try {
        await gotData(numIdxPath, fixture.input);
      } catch (error) {
        const { result } = error.response.body;
        assert.equal(result, fixture.expected);
      }
    });
  });
});
