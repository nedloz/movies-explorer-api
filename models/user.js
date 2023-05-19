const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UnAuthorizedError = require('../errors/UnAuthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        validator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnAuthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnAuthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('users', userSchema);
