const { user } = require('../database/models');
const createToken = require('../helpers/createToken');
const unauthorized = require('../errors/unauthorized');
const passwordEncryptor = require('../helpers/passwordEncryptor');

const login = async ({ email, password }) => {
  const encryptedPassword = passwordEncryptor(password);

  const getUser = await user.findOne({ where: { email, password: encryptedPassword } });

  if (getUser === false) throw unauthorized('Invalid fields');

  const userToken = createToken({ id: getUser.id });

  const userLoged = {
    name: getUser.name,
    email: getUser.email,
    role: getUser.email,
    token: userToken,
  };
  
  return userLoged;
};

module.exports = { login }; 