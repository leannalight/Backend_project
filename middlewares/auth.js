const jwt = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    return handleAuthError(res);
  }

  let payload;

  try {
    payload = jwt.verify(token, 'SECRET_KEY');
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
