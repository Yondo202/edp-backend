const sequelizePaginate = require("sequelize-paginate");

module.exports = function(sequelize,DataTypes) {
    const Country = sequelize.define(
        "country",
        {
            id:{
                type:DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true,
            },
            description:{
                type:DataTypes.STRING(60),
                allowNull:false,
            },
            code:{
                type:DataTypes.STRING(30),
                allowNull:true,
            },
            description_mon:{
                type:DataTypes.STRING(60),
                allowNull:true
            }
        },
        {
            tableName:"country",
        }
    )
    sequelizePaginate.paginate(Country);
    return Country;
}