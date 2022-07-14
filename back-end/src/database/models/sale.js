
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

const saleModel = (sequelize) => {
  const sale = sequelize.define('sale', attributes, {
    modelName: 'sale',
    tableName: 'sales',
    timestamps: false,
    undescored: true,
  });

  sale.associate = (models) => {
    sale.belongsTo(models.user, { as: 'user', foreignKey: 'userId' });
    sale.belongsTo(models.user, { as: 'user', foreignKey: 'sellerId' });
  };

  return sale;
};

module.exports = saleModel;
