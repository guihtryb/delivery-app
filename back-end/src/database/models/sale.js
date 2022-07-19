const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  totalPrice: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },

  deliveryAddress: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  deliveryNumber: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  saleDate: {
    allowNull: false,
    type: DataTypes.DATE,
  },

  status: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

module.exports = (sequelize) => {
  const sale = sequelize.define(
    'sale',
    attributes,
    {
      timestamps: false,
      undescored: true,
    },
  );

  sale.associate = (models) => {
    sale.belongsTo(models.user, { as: 'users', foreignKey: 'userId' });
  };

  return sale;
};
