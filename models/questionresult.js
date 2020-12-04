const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  const QuestionResult = sequelize.define(
    "questionresult",
    {},
    {
      timeStamp: true,
      tableName: "questionresult",
    }
  );
  return QuestionResult;
};
