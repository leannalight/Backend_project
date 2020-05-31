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
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = req.body;
  // eslint-disable-next-line object-curly-newline
  User.create({ name, about, avatar, email, password })
    .then((user) => res.send({ data: user }))
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
      res.send({
        token: jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' }),
      });
    })
    .catch((error) => {
      res.status(401).send({ message: error.message });
    });
};
