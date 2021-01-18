const { Router } = require("express");

const router = Router();
const auth = require("../controllers/auth");

router.post("/login", auth.loginController);

router.post("/register", auth.registerController);

module.exports = router;
