const { StatusCodes } = require("http-status-codes");
const GlobalErrorHandler = (err, req, res, next) => {
  const message = err.message;
  const statusCode = err.statusCode? err.statusCode: StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json(message);
};

module.exports = GlobalErrorHandler;
