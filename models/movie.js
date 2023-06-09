const mongoose = require('mongoose');
const { linkSchema } = require('../utils/constants');

const movieShema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkSchema.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkSchema.test(v);
      },
    },
  },
  thumbnail: { // мини изображение
    type: String,
    required: true,
    validate: {
      validator(v) {
        return linkSchema.test(v);
      },
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  movieId: { // id с другого сервиса
    type: Number,
    required: true,
  },
  nameRU: { // валидация русского
    type: String,
    required: true,
  },
  nameEN: { // валидация англ
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movies', movieShema);
