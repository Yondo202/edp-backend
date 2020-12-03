const sequelizePagination = require("sequelize-paginate");
module.exports = function(sequelize,DataTypes){
    const Location = sequelize.define(
        "location",
        {
            id:{
                type:DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true,
            },
            description:{
                type:DataTypes.STRING(45),
                allowNull:false,
            },
            is_duureg:{
                type:DataTypes.BOOLEAN,
                allowNull:false,
                defaultValue:0
            },
            code:{
                type:DataTypes.INTEGER,
                allowNull:true
            },
            description_mon:{
                type:DataTypes.STRING(45),
                allowNull:true
            }
        },
        {
            tableName:"location",
            timestamps:true
        }
    )
    sequelizePagination.paginate(Location);
    return Location;
}