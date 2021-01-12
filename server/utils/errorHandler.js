// выбор switch/case обоснован возможным добавлением новых типов пользовательских ошибок будущем.

const errorHandler = (err, res) => {
  switch (err.type) {
    case "ValidationError":
      res.status(400);
      res.send({ result: err.message });
      break;

    default:
      res.status(500);
      res.send({ result: err.message });
      break;
  }
};

module.exports = errorHandler;
