const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize, DataTypes) => {
  const QuestionDetails = sequelize.define(
    "questiondetails",
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      questionid: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        reference: {
          model: "questions",
          key: "id",
        },
      },
    },
    {
      timeStamp: true,
      tableName: "questiondetails",
    }
  );
  sequelizePaginate.paginate(QuestionDetails);
  return QuestionDetails;
};
