const { DataTypes } = require('sequelize');

const attributes = {
  quantity: DataTypes.NUMBER
}

module.exports = (sequelize) => {
  const saleProduct = sequelize.define(
    'salesProduct',
    attributes,
    {
      underscored: true,
    }
  );

  saleProduct.associate = (models) => {
    models.product.belongsToMany(models.sale, {
      as: 'sales',
      through: saleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId'
    });

    models.sale.belongsToMany(models.product, {
      as: 'products',
      through: saleProduct,
      foreignKey: 'saleId',
      otherKey: 'productId'
    });
  }

  return saleProduct;
};