const router = require('express').Router();
const signRouter = require('./signroutes');
const auth = require('../middleware/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');

router.use(signRouter);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((res, req, next) => {
  next(new NotFoundError('Страницы пока нет'));
});

module.exports = router;
