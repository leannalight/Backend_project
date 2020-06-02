const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');


module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).send({ message: 'Список пользователей пуст' });
      }
      return res.send({ data: users });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: error.message });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    });
};

module.exports.getUserbyId = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
      } else {
        res.send({ data: user });
      }
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: error.message });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    });
};

module.exports.createUser = (req, res) => {
  const {
    // eslint-disable-next-line no-unused-vars
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user.omitPrivate() }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ message: error.message });
      }
      if (error.name === 'CastError') {
        return res.status(400).send({ message: error.message });
      }
      return res.status(500).send({ message: error.message });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аунтентификация успешна
      const token = jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};
