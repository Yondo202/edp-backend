const sequelizePaginate = require("sequelize-paginate");
module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pcode: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      description_mon: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "products",
    }
  );
  sequelizePaginate.paginate(Product);
  return Product;
};
