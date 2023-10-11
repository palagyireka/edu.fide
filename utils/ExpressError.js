class ExpressError extends Error {
  constructor(message, statusCode, type = "default") {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.type = type;
  }
}

module.exports = ExpressError;
