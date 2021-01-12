function ValidExcep(message) {
  this.message = message;
  this.type = "ValidationError";
}

module.exports = ValidExcep;
