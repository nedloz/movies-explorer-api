const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnAuthorizedError = require('../errors/UnAuthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
  } catch (err) {
    next(new UnAuthorizedError('Необходима авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;
