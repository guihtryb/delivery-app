const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: DataTypes.STRING,
  price: DataTypes.DECIMAL(10,2),
  urlImg: { type: DataTypes.STRING, field: 'url_image' }
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
