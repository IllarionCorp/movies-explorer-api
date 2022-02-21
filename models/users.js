const mongoose = require('mongoose');

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

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;

  return obj;
};

module.exports = mongoose.model('users', userSchema);
