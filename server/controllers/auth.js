const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidator } = require("../utils/validators");

const loginController = async (req, res) => {
  const playersCollection = req.app.locals.playersColl;
  const savedPlayers = req.app.locals.savedPlayers;
  const loggedUser = req.body;
  let score, maxScore, gamesCount;

  // Находим очки игрока
  await savedPlayers.findOne({ login: loggedUser.login }).then((user) => {
    if (user === null) {
      score = 0;
      maxScore = 0;
      gamesCount = 0;
      return;
    }
    score = user.score;
    maxScore = user.maxScore;
    gamesCount = user.gamesCount;
  });

  await playersCollection.findOne({ login: loggedUser.login }).then((user) => {
    if (user === undefined || user === null) {
      // Если пользователь не был найден - неверный логин
      res.status(404);
      res.send({ error: "please provide correct login/password or create an account." });
      return;
    }

    // Проверяем пароль
    try {
      const isValid = bcrypt.compareSync(loggedUser.password, user.password);
      if (!isValid) {
        res.send({ error: "wrong password." });
        return;
      }
    } catch (error) {
      console.error(error);
    }

    // Если пароль верный - делаем токен
    jwt.sign(
      {
        login: user.login,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      "secretkey",
      (err, token) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.send({ error: "Sorry, something went wrong." });
          return;
        }
        // Если токен создался без ошибок - возвращаем данные пользователя вместе с токеном
        res.status(200);
        res.send({
          ...user,
          score,
          maxScore,
          gamesCount,
          isAuth: true,
          token,
        });
      }
    );
  });
};

const registerController = (req, res) => {
  const playersCollection = req.app.locals.playersColl;
  const IP = (req.headers["x-forwarded-for"] || "").split(",")[0] || req.connection.remoteAddress;

  // Валидация полученного юзера
  const isValidUser = registerValidator(req.body);
  if (!isValidUser) {
    res.status(400);
    res.send({ error: "Invalid login/password. Account was not created." });
    return;
  }

  // Проверка на уникальность
  playersCollection.findOne({ login: req.body.login }).then((player) => {
    if (player) {
      res.status(400);
      res.send({ error: "This login is already taken." });
      return;
    }

    // Если юзер уникален - добавляем его в бд;
    // Решил сохранить без форматирования, что бы можно было в будущем работать над ней
    const registerDate = new Date();
    const createdUser = { ...req.body, IP, registerDate };

    // Создаём токен
    jwt.sign(
      { login: createdUser.login, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      "secretkey",
      (err, token) => {
        if (err) {
          console.error(err);
          res.status(500);
          res.send({ error: "Sorry, something went wrong." });
          return;
        }

        try {
          playersCollection
            .insertOne({
              ...createdUser,
              password: bcrypt.hashSync(req.body.password, 8),
            })
            .then(({ ops }) => {
              const userId = ops[0]._id;
              res.status(201);
              res.send({
                ...createdUser,
                _id: userId,
                isAuth: true,
                token,
              });
            });
        } catch (error) {
          console.error(error);
          res.status(500);
          res.send({ error: "Sorry, something went wrong." });
          return;
        }
      }
    );
  });
};

exports.loginController = loginController;
exports.registerController = registerController;
