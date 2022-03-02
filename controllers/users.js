const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

const { JWT_SECRET } = process.env;

module.exports.getUser = (req, res, next) => {
  const id = req.user._id;
  return User
    .findById(id)
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Не валидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  const id = req.user._id;

  return User
    .findByIdAndUpdate(
      id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOneByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET);
      console.log(JWT_SECRET);
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: false,
        })
        .send({ user });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      name,
      password: hash,
    })
      .then((user) => {
        res.status(201).send({ user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
        } else if (err.code === 11000) {
          next(new ConflictError(`Пользователь c email:${email} уже существует`));
        } else {
          next(err);
        }
      }));
};

module.exports.logoutUser = (req, res, next) => {
  res.clearCookie('jwt');
  try {
    res.status(200).send('Вы вышли');
  } catch (err) {
    next(err);
  }
};
