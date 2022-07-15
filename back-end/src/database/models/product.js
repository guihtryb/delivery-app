const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    url_image: DataTypes.STRING
  },
    {
      modelName: "product",
      tableName: "products",
      timestamps: false,
      underscored: true,
    }
  );
  return Product;
}

module.exports = Product;