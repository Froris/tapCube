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
app.post("/save", async (req, res) => {
  const savedPlayer = req.body;
  const savedPlayersColl = req.app.locals.savedPlayers;
  const { login, score, maxScore, gamesCount } = savedPlayer;

  try {
    const updatedPlayer = await savedPlayersColl
      .findOneAndUpdate({ login }, { $set: { score, maxScore, gamesCount } }, { returnOriginal: false })
      .then((result) => {
        // Если игрок уже есть - возвращаем обновлённый документ игрока
        if (result.value !== null) {
          return result.value;
        }

        // Иначе - создаём его
        return savedPlayersColl.insertOne(savedPlayer).then((result) => {
          const newSavedPlayer = result.ops[0];
          return newSavedPlayer;
        });
      });

    // Берём список игроков и возвращаем его вместе с обновлённым текущим игроком
    savedPlayersColl
      .find()
      .sort({ score: -1 })
      .toArray()
      .then((list) => {
        if (list.length <= 10) {
          res.send({ list, savedPlayer: updatedPlayer });
          return;
        }

        const top10Players = list.splice(0, 10);
        res.send({ list: top10Players, savedPlayer: updatedPlayer });
        return;
      });
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send({ error: "Updating failed!" });
    return;
  }
});

// LOGIN/REGISTER HOME TASK
app.use("/auth", authRoutes);

// HOME TASK FUNCTIONS
app.use("/algorithms", algorithmsRoutes);

//PAGINATION
app.get("/list", async (req, res) => {
  const savedPlayers = req.app.locals.savedPlayers;
  const pageNum = req.query.page || 0;
  const sortedList = await savedPlayers.find().sort({ score: -1 }).toArray();
  const listPages = [];

  do {
    listPages.push(sortedList.splice(0, 10));
  } while (sortedList.length > 0);

  res.send({ page: listPages[pageNum], pagesCount: listPages.length });
});

// Смена админа
app.post("/set-admin", (req, res) => {
  const savedPlayers = req.app.locals.savedPlayers;
  const playersCollection = req.app.locals.playersColl;

  const updateAdmin = async () => {
    const newAdmin = req.body.newAdminLogin;
    const oldAdmin = req.body.currAdminLogin;
    // Обновление нового админа
    await savedPlayers.findOneAndUpdate({ login: newAdmin }, { $set: { role: "admin" } });
    await playersCollection.findOneAndUpdate({ login: newAdmin }, { $set: { role: "admin" } });
    // Обновление старого админа
    await playersCollection.findOneAndUpdate({ login: oldAdmin }, { $set: { role: "gamer" } });
    // В value хранится объект с обновлёнными параметрами текущего игрока
    return await savedPlayers
      .findOneAndUpdate({ login: oldAdmin }, { $set: { role: "gamer" } }, { returnOriginal: false })
      .then((updatedPlayer) => updatedPlayer.value);
  };

  try {
    updateAdmin().then((result) => res.send({ result: { ...result } }));
    return;
  } catch (error) {
    console.error(error.message);
    return;
  }
});

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
