const { Router } = require("express");

const router = Router();
const algorithms = require("../controllers/algorithms");

router.post("/rom-num", algorithms.romNumController);

router.post("/is-palindrome", algorithms.palindromeController);

router.post("/check-brackets", algorithms.bracketsController);

router.post("/sort-array", algorithms.sortArrController);

router.post("/get-num-idx", algorithms.getIdxController);

module.exports = router;
