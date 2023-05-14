const Movies = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
const ConflictError = require('../errors/ConflictError'); // 409
const ForbiddenError = require('../errors/ForbiddenError');

const getFilms = (req, res, next) => {
  Movies.find({})
    .populate('owner')
    .then((films) => res.send(films))
    .catch(next);
};

const createFilm = (req, res, next) => {
  const filmInfo = req.body;
  Movies.create(filmInfo)
    .then((film) => {
      res.send(film);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданны некорректные данные'));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Этот фильм уже добавлен'));
      }
      next(err);
    });
};

const deleteFilm = (req, res, next) => {
  const { _id } = req.params;
  Movies.findById(_id)
    .orFail(() => new NotFoundError('Фильм с указанным _id не найден'))
    .then((film) => {
      if (!film.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить фильм который вы не сохраняли'));
      }
      return film.deleteOne(film)
        .then(() => res.send('Фильм удален'));
    })
    .catch(next);
};

module.exports = {
  getFilms,
  createFilm,
  deleteFilm,
};

// {
//   "country": "Russia",
//   "director": "andru",
//   "duration": "60",
//   "year": "1982",
//   "description": "film",
//   "image": "https://plus.unsplash.com/premium_photo-1666264200754-1a2d5f2f6695?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&  auto=format&fit=crop&w=1470&q=80",
//   "trailerLink" : "https://plus.unsplash.com/premium_photo-1666264200754-1a2d5f2f6695?ixlib=rb-4.0.3& ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//   "thumbnail": "https://plus.unsplash.com/premium_photo-1666264200754-1a2d5f2f6695?ixlib=rb-4.0.3&    ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
//   "owner": "645fc9642154876593b9c52a",
//   "movieId": "645fc9642154876593b9c52d",
//   "nameRu": "Катастрофа",
//   "nameEn": "da"
// }
