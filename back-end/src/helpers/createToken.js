const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (payload) => {
const secretKey = 'secrete_key';

const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const token = jwt.sign(payload, secretKey, jwtConfig);

return token;
};

module.exports = createToken;