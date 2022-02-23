const router = require('express').Router();
const { getMyMovies, postMovies, deleteMovie } = require('../controllers/movies');

router.get('/', getMyMovies);

router.post('/', postMovies);

router.delete('/:_id', deleteMovie);

module.exports = router;
