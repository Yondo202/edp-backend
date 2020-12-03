
const sequelizePaginate = require("sequelize-paginate");
module.exports = (sequelize,Datatypes)=>{
    const Business_sector = sequelize.define(
        "business_sector",
    {
        id:{
            type:Datatypes.INTEGER.UNSIGNED,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        bdescription:{
            type:Datatypes.STRING(200),
            allowNull:false,
        },
        bcode:{
            type:Datatypes.STRING(20),
            allowNull:false,
        },
        ismining:{
            type:Datatypes.INTEGER,
            allowNull:true,
        },
        bdescription_mon:{
            type:Datatypes.STRING(200),
            allowNull:true
        }
    },
    {
        tableName:"business_sector",
        timestamps:false
    }
    );
    sequelizePaginate.paginate(Business_sector);
    return Business_sector;
}