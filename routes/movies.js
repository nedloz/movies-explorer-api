const router = require('express').Router();

const { createFilmValidator, deleteFilmValidator } = require('../middlewares/validators');

const {
  getFilms,
  createFilm,
  deleteFilm,
} = require('../controllers/movies');

router.get('/', getFilms);
router.post('/', createFilmValidator, createFilm);
router.delete('/:_id', deleteFilmValidator, deleteFilm);

module.exports = router;
