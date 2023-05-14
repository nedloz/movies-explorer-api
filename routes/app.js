const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { createUser, login, signOut } = require('../controllers/users');
const { signInValidator, signUpValidator } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signUpValidator, createUser);
router.use('/signin', signInValidator, login);
router.use('/signout', signOut);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError('Такого пути не существует')));

module.exports = router;
