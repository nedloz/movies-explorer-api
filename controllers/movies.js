const Movies = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError'); // 404
const BadRequestError = require('../errors/BadRequestError'); // 400
// const ConflictError = require('../errors/ConflictError'); // 409
const ForbiddenError = require('../errors/ForbiddenError');

const {
  uncorrectDataText,
  notFoundFilmText,
  deleteNotYourFilmText,
  fineDeleteFilmText,
} = require('../utils/constants');

const getFilms = (req, res, next) => {
  Movies.find({})
    .populate('owner')
    .then((films) => res.send(films))
    .catch(next);
};

const createFilm = (req, res, next) => {
  const filmInfo = req.body;
  Movies.create({ ...filmInfo, owner: req.user._id })
    .then((film) => {
      res.send(film);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(uncorrectDataText));
        return;
      }
      next(err);
    });
};

const deleteFilm = (req, res, next) => {
  const { _id } = req.params;
  Movies.findById(_id)
    .orFail(() => new NotFoundError(notFoundFilmText))
    .then((film) => {
      if (!film.owner._id.equals(req.user._id)) {
        next(new ForbiddenError(deleteNotYourFilmText));
        return;
      }
      film.deleteOne(film)
        .then(() => res.send({ message: fineDeleteFilmText }));
    })
    .catch(next);
};

module.exports = {
  getFilms,
  createFilm,
  deleteFilm,
};
