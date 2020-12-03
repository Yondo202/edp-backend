const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize,DataTypes)=>{
    const Occupation = sequelize.define(
        "occupation",
        {
            id:{
                type:DataTypes.INTEGER.UNSIGNED,
                allowNull:false,
                primaryKey:true,
                autoIncrement:true
            },
            description:{
                type:DataTypes.STRING(60),
                allowNull:false
            },
            description_mon:{
                type:DataTypes.STRING(60),
                allowNull:true
            }
        },
        {
            tableName:"occupation"
        }
    )
    sequelizePaginate.paginate(Occupation);
    return Occupation;
}