const Movie = require('../models/movies');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const Forbidden = require('../errors/forbidden');

module.exports.getMyMovies = (req, res, next) => Movie
  .find({ owner: req.user._id })
  .then((movies) => {
    res.status(200).send(movies);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError('Невалидный id'));
    } else {
      next(err);
    }
  });

module.exports.postMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRu,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  return Movie
    .create(
      {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRu,
        nameEN,
        thumbnail,
        movieId,
        owner,
      },
    )
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const movieId = req.params;
  const myId = req.user._id;

  return Movie
    .findById(movieId)
    .orFail(new NotFoundError('Фильм с указанным id не найден'))
    .then((movies) => {
      if (movies.owner.toString() === myId) {
        return Movie.findByIdAndDelete(movieId)
          .then(() => res.send(movies));
      }
      throw new Forbidden('Нет прав для выполнения операции');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};
