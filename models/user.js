const mongoose = require('mongoose');
const usersValidator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (linkAvatar) => usersValidator.isURL(linkAvatar),
      message: (props) => `${props.value} is not valid avatar link!`,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (email) => usersValidator.isEmail(email),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject((new Error('Неправильные почта или пароль')));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user; // теперь user достуен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
