const createToken = require('../helpers/createToken');
const unauthorized = require('../errors/unauthorized');
const userVerify = require('./validates/userVerify');
const passwordEncryptor = require('../helpers/passwordEncryptor');

const login = async ({ email, password }) => {
  const encryptedPassword = passwordEncryptor(password);

  const isUser = await userVerify(email, encryptedPassword);

  if (isUser === false) throw unauthorized('Invalid fields');

  const userToken = createToken({ id: isUser.id });

  return userToken;
};

module.exports = { login }; 