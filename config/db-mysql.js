const Sequelize = require("sequelize");
var db = {};
const sequelize = new Sequelize(
  process.env.SEQUELIZE_DATABASE,
  process.env.SEQUELIZE_USER,
  process.env.SEQUELIZE_USER_PASSWORD,
  {
    host: process.env.SEQUELIZE_HOST,
    port: process.env.SEQUELIZE_PORT,
    dialect: process.env.SEQUELIZE_DIALECT,
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    operatorAliases: false,
  }
);
const models = [
  require("../models/product"),
  require("../models/company"),
  require("../models/business_sector"),
  require("../models/user"),
  require("../models/country"),
  require("../models/location"),
  require("../models/occupation"),
  require("../models/question"),
  require("../models/questiondetail"),
];
models.forEach((model) => {
  const seqModel = model(sequelize, Sequelize);
  db[seqModel.name] = seqModel;
});
db.questions.hasMany(db.questiondetails, { foreignKey: "questionid" });
db.questiondetails.belongsTo(db.questions, { foreignKey: "questionid" });
db.business_sector.hasMany(db.companies, { foreignKey: "business_sectorid" });
db.companies.belongsTo(db.business_sector, { foreignKey: "business_sectorid" });
db.companies.belongsTo(db.country, { foreignKey: "invested_countryid" });
db.companies.belongsTo(db.location, { foreignKey: "locationid" });
db.companies.belongsTo(db.occupation, { foreignKey: "occupationid" });
db.sequelize = sequelize;
module.exports = db;
