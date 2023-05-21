const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');
const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const ConflictError = require('../errors/ConflictError'); // 409
const {
  uncorrectDataText, emailConflictText,
  notFoundIdText, uncorrectIdText,
  notFoundUserText,
} = require('../utils/constants');
const { devJwtSecret } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 15)
    .then((hash) => Users.create({
      email, password: hash, name,
    }))
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(uncorrectDataText));
        return;
      }
      // повторный email
      if (err.code === 11000) {
        next(new ConflictError(emailConflictText));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  Users.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : devJwtSecret,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          httpOnly: true,
          maxAge: 3600000 * 24 * 7,
          sameSite: true,
        })
        .send({
          _id: user._id,
          email: user.email,
          name: user.name,
        });
    })
    .catch(next);
};

const signOut = (req, res) => {
  res.clearCookie('jwt').end();
};

const getMe = (req, res, next) => {
  Users.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(notFoundIdText));
        return;
      }
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(uncorrectIdText));
        return;
      }
      next(err);
    });
};

const updateMe = (req, res, next) => {
  const newUser = req.body;
  // new возвращает измененный документ
  Users.findByIdAndUpdate(req.user._id, newUser, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError(notFoundUserText));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(uncorrectDataText));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequestError(uncorrectIdText));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError(emailConflictText));
        return;
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getMe,
  updateMe,
  signOut,
};
