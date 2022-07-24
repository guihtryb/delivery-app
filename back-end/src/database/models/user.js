const { DataTypes } = require('sequelize');

const attributes = {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
};

module.exports = (sequelize) => {
  const user = sequelize.define(
    'user',
    attributes,
    {
      timestamps: false,
      underscored: true
    }
  );

  user.associate = (models) => {
    user.hasMany(models.sale, { as: 'users', foreignKey: 'user_id' });
    user.hasMany(models.sale, { as: 'sellers', foreignKey: 'seller_id' });
  };

  return user;
};
