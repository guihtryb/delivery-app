const { DataTypes } = require('sequelize');

const attributes = {
  name: DataTypes.STRING,
  price: DataTypes.NUMBER,
  url_image: DataTypes.STRING
};

module.exports = (sequelize) => {
  const product = sequelize.define(
    'product',
    attributes,
    {
      timestamps: false,
      underscored: true,
    }
  );
  return product;
}
