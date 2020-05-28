const mongoose = require('mongoose');
const usersValidator = require('validator');

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
  },
});

module.exports = mongoose.model('user', userSchema);
