const router = require('express').Router();
const { getMyMovies, postMovies, deleteMovie } = require('../controllers/movies');
const { validationPostMovies, validationDeleteMovie } = require('../middleware/validation');

router.get('/', getMyMovies);

router.post('/', validationPostMovies, postMovies);

router.delete('/:_id', validationDeleteMovie, deleteMovie);

module.exports = router;
