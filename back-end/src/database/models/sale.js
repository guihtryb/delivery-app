const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  userId: {
    allowNull: false,
    field: 'user_id',
    foreignKey: true,
    type: DataTypes.INTEGER,
  },

  sellerId: {
    allowNull: false,
    field: 'seller_id',
    foreignKey: true,
    type: DataTypes.INTEGER,
  },

  totalPrice: {
    allowNull: false,
    type: DataTypes.DECIMAL,
    field: 'total_price',
  },

  deliveryAddress: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'delivery_address',
  },

  deliveryNumber: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'delivery_number',
  },

  saleDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'sale_date',
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
    sale.belongsTo(models.user, { as: 'users', foreignKey: 'user_id' });
    sale.belongsTo(models.user, { as: 'sellers', foreignKey: 'seller_id' });
  };

  return sale;
};
