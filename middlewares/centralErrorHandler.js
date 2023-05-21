const { centralServerErrorText } = require('../utils/constants');

const centralErrorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode || 500)
    .send({
      message:
        statusCode === 500
          ? centralServerErrorText
          : message,
    });
  next();
};

module.exports = centralErrorHandler;
