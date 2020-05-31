const jwt = require('jsonwebtoken');

const handleAuthError =(res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};
const extractBearerToken = (header) => {
  return header.replace('Bearer', '');
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Необходима авторизация' })ж
  }
  //извлечём токен
  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    // отправим ошибку, если не получилос
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};