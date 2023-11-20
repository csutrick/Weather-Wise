const jwt = require('jsonwebtoken');

const secret = 'testingggg';
const expiration = '2h';

module.exports = {
  signToken: function ({ email, name, _id, favorites }) {
    const payload = { email, name, _id, favorites };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};