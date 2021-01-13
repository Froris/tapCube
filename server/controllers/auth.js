const jwt = require("jsonwebtoken");

const loginController = (req, res) => {
  const mockUser = {
    username: "admin",
    password: "qwerty",
  };

  if (req.body.password === mockUser.password && req.body.username === mockUser.username) {
    jwt.sign(
      { user: mockUser.username, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      "secretkey",
      (err, token) => {
        res.send({ isAuth: true, token });
      }
    );
  }
};

exports.loginController = loginController;
