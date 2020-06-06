// eslint-disable-next-line no-unused-vars
const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.PrivateKey = process.env.NODE_ENV === 'development' ? 'some-dev-secret' : JWT_SECRET;
