const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/not-found-error');
const Unauthorized = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findOneByCredentials = function (email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Неправильный email или пароль');
      }

      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неправильный email или пароль');
          }

          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;

  return obj;
};

module.exports = mongoose.model('users', userSchema);
