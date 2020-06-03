const jwt = require('jsonwebtoken');

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
    const { SECRET_KEY } = process.env;
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
