const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

const sortPlayers = require("./controllers/sortPlayers");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")));

app.get("/get-players", (req, res) => {
  fs.stat(path.join(__dirname, "savedPlayers", "players.json"), (err, stats) => {
    // Проверка существования файла
    if (err == null && stats.isFile()) {
      if (stats.size === 0) return res.send({});
      const playersJSON = fs.readFileSync(path.join(__dirname, "savedPlayers", "players.json"));
      res.status(200);
      res.send(playersJSON);
    } else if (err.code === "ENOENT") {
      res.status(200).send({});
    }
  });
});

app.get("/new-game", (req, res) => {
  fs.stat(path.join(__dirname, "savedPlayers", "players.json"), (err, stats) => {
    if (err) {
      res.status(404).send({ message: "Results already cleared" });
      return console.error(err);
    }

    fs.unlink(path.join(__dirname, "savedPlayers", "players.json"), (err) => {
      if (err) return console.log(err);
      res.status(200).send({ message: "Results was cleared" });
    });
  });
});

app.post("/save", (req, res) => {
  const sortedPlayers = sortPlayers(req.body.playersList);
  if (sortedPlayers.length > 0) {
    fs.writeFile(
      path.join(__dirname, "savedPlayers", "players.json"),
      JSON.stringify({ playersList: sortedPlayers, lastPlay: req.body.lastPlay }),
      (err) => {
        if (err) {
          res.status(500).send({ error: "Players have not been saved!" });
          throw new Error(err);
        } else {
          res.status(200).send({ playersList: sortedPlayers, lastPlay: req.body.lastPlay });
        }
      }
    );
  } else {
    res.status(500).send({ error: "The player list was not received by the server or an empty array was sent." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
