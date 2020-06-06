const JWT_SECRET = require('./.env');

module.exports.PrivateKey = process.env.NODE_ENV === 'development' ? 'some-dev-secret' : JWT_SECRET;
