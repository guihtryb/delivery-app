const { DataTypes } = require('sequelize');

const attributes = {
  saleId: {
    allowNull: false,
    field: 'sale_id',
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  productId: {
    allowNull: false,
    field: 'product_id',
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER,
  }
};

module.exports = (sequelize) => {
  const salesProduct = sequelize.define(
    'salesProduct',
    attributes,
    { timestamps: false }
  );

  salesProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sales',
      foreignKey: 'product_id',
      otherKey: 'sale_id',
      through: salesProduct,
    });

    models.sale.belongsToMany(models.product, {
      as: 'products',
      foreignKey: 'sale_id',
      otherKey: 'product_id',
      through: salesProduct,
    });
  };

  return salesProduct;
};