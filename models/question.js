const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define(
    "questions",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "questions",
    }
  );

  sequelizePaginate.paginate(Questions);
  return Questions;
};
