const jwt = require('jsonwebtoken');
const { PrivateKey } = require('../config');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, PrivateKey);
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
