const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidator } = require("../utils/validators");

const loginController = (req, res) => {
  const playersCollection = req.app.locals.playersColl;
  const savedPlayers = req.app.locals.savedPlayers;
  const loggedUser = req.body;
  let maxScore;
  let gamesCount;

  // Находим очки игрока
  savedPlayers.findOne({ login: loggedUser.login }).then((user) => {
    if (user === null) {
      maxScore = 0;
      gamesCount = 0;
      return;
    }

    maxScore = user.maxScore;
    gamesCount = user.gamesCount;
    return;
  });

  playersCollection.findOne({ login: loggedUser.login }).then((user) => {
    // Если найден пользователь
    if (user) {
      // Проверяем пароль
      try {
        const isValid = bcrypt.compareSync(loggedUser.password, user.password);
        if (!isValid) {
          res.send({ error: "please provide correct login/password or create an account." });
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
            _id: user._id,
            role: user.role,
            username: user.username,
            login: user.login,
            IP: user.IP,
            registerDate: user.registerDate,
            maxScore,
            gamesCount,
            isAuth: true,
            token,
          });
        }
      );
      return;
    }
    // Если пользователь не был найден - неверный логин
    res.status(404);
    res.send({ error: "please provide correct login/password or create an account." });
  });
};

const registerController = (req, res) => {
  const playersCollection = req.app.locals.playersColl;
  const createdUser = req.body;
  const IP = (req.headers["x-forwarded-for"] || "").split(",")[0] || req.connection.remoteAddress;
  // Решил сохранить без форматирования, что бы можно было в будущем работать над ней
  const regDate = new Date();

  // Валидация полученного юзера
  const isValidUser = registerValidator(createdUser);

  if (!isValidUser) {
    res.status(400);
    res.send({ error: "Invalid login/password. Account was not created." });
    return;
  }

  // Шифровка пароля
  const hashedPass = bcrypt.hashSync(createdUser.password, 8);

  // Проверка на уникальность
  playersCollection.findOne({ login: createdUser.login }).then((player) => {
    if (player) {
      res.status(400);
      res.send({ error: "This login is already taken." });
      return;
    }

    // Если юзер уникален - добавляем его в бд;
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

        playersCollection
          .insertOne({
            _id: Object._id,
            role: createdUser.role,
            username: createdUser.username,
            login: createdUser.login,
            password: hashedPass,
            IP,
            registerDate: regDate,
          })
          .then(({ ops }) => {
            res.status(201);
            res.send({
              _id: ops[0]._id,
              role: createdUser.role,
              username: createdUser.username,
              login: createdUser.login,
              isAuth: true,
              token,
              IP,
              registerDate: regDate,
            });
          });
      }
    );
  });
};

exports.loginController = loginController;
exports.registerController = registerController;
