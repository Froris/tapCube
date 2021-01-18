const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const authRoutes = require("./routes/authRoutes");
const algorithmsRoutes = require("./routes/algorithms");
const checkToken = require("./utils/checkToken");

app.use(cors());
app.set("trust proxy", "linklocal, uniquelocal");

// Парсим тело запроса
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error(err);
    res.status(400);
    res.send({ result: "SyntaxError: Invalid JSON format." });
    return;
  }

  next();
});

app.use(express.static(path.join(__dirname, "..", "build")));

// Отправка приложения
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// После попадания на главную страницу - отсылаем токен
// проверяем наличие токена и сам токен
app.post("/", checkToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, userData) => {
    if (err) {
      res.status(401);
      res.send({ error: "Not authorized", isAuth: false });
    } else {
      res.send({ isAuth: true, userData });
    }
  });
});

// Получение списка игроков
app.get("/get-players", (req, res) => {
  const savedPlayers = req.app.locals.savedPlayers;

  savedPlayers
    .find()
    .sort({ score: -1 })
    .toArray()
    .then((list) => {
      if (list.length === 0) {
        res.send({ list: [] });
        return;
      }

      if (list.length <= 10) {
        res.send({ list });
        return;
      }

      const top10Players = list.splice(0, 10);
      res.send({ list: top10Players });
    });
});

app.get("/new-game", (req, res) => {
  const savedPlayers = req.app.locals.savedPlayers;

  try {
    savedPlayers.deleteMany({}).then((response) => {
      if (response.result.ok === 1) {
        res.send({ message: "Data was cleared." });
        return;
      }
      throw new Error("Data removing failed!");
    });
  } catch (err) {
    console.error(err);
    res.send({ error: err.message });
  }
});

// Сохранение игроков
app.post("/save", (req, res) => {
  const savedPlayer = req.body;
  const savedPlayers = req.app.locals.savedPlayers;
  const { score, maxScore } = savedPlayer;

  // СДЕЛАТЬ РЕФАКТОР ЦЕПОЧЕК ПРОМИСОВ
  savedPlayers
    .findOneAndUpdate({ login: savedPlayer.login }, { $set: { score, maxScore } })
    .then((response) => {
      if (!response.ok) {
        res.status(500);
        res.send({ error: "Updating failed!" });
        return;
      }
      // Если игрок не найден - создаём его
      if (response.value === null) {
        savedPlayers
          .insertOne({
            login: savedPlayer.login,
            username: savedPlayer.username,
            score: savedPlayer.score,
            maxScore: savedPlayer.maxScore,
          })
          .then(() => {
            savedPlayers
              .find()
              .sort({ score: -1 })
              .toArray()
              .then((list) => {
                if (list.length <= 10) {
                  res.send({ list, savedPlayer });
                  return;
                }

                const top10Players = list.splice(0, 10);
                res.send({ list: top10Players, savedPlayer });
                return;
              });
          });
      }
    })
    .then(() => {
      savedPlayers
        .find()
        .sort({ score: -1 })
        .toArray()
        .then((list) => {
          if (list.length <= 10) {
            res.send({ list, savedPlayer });
            return;
          }

          const top10Players = list.splice(0, 10);
          res.send({ list: top10Players, savedPlayer });
          return;
        });
    });
});

// LOGIN/REGISTER HOME TASK
app.use("/auth", authRoutes);

// HOME TASK FUNCTIONS
app.use("/algorithms", algorithmsRoutes);

// DB CONNECT
const url = "mongodb+srv://froris:frorispass111@cluster0.ha6ee.mongodb.net/TapCube?retryWrites=true&w=majority";
MongoClient.connect(url)
  .then((client) => {
    const db = client.db("TapCube");
    const playersColl = db.collection("players");
    const savedPls = db.collection("savedPlayers");
    app.locals.playersColl = playersColl;
    app.locals.savedPlayers = savedPls;
    app.listen(PORT, () => console.info(`REST API running on port ${PORT}`));
  })
  .catch((error) => console.error(error));
