const { User } = require('../../database/models');

const userVerify = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  if (user) return userVerify;
  return false;
};

module.exports = userVerify;