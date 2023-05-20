const router = require('express').Router();

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { notFoundPathText } = require('../utils/constants');

const { createUser, login, signOut } = require('../controllers/users');
const { signInValidator, signUpValidator } = require('../middlewares/validators');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signUpValidator, createUser);
router.use('/signin', signInValidator, login);
router.use('/signout', auth, signOut);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', auth, (req, res, next) => next(new NotFoundError(notFoundPathText)));

module.exports = router;
