const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    url_image: DataTypes.STRING
  });
  return Product;
}

module.exports = Product;