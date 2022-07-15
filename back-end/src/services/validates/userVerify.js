const { user } = require('../../database/models');

const userVerify = async (email, password) => {
  const chackUser = await user.findOne({ where: { email, password } });
  if (chackUser) return userVerify;
  return false;
};

module.exports = userVerify;