const sequelizePaginate = require("sequelize-paginate");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


module.exports = function(sequelize, DataTypes) {
	const user =  sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(20),
            allowNull: false,
            validate:{
                notNull:{
                    msg:"Хэрэглэгчийн нэрийг оруулна уу"
                }
            }
		},
		email: {
			type: DataTypes.STRING(245),
            allowNull: false,
            validate:{
                isEmail:{
                    msg:"Имэйл хаяг буруу байна."
                },
                notNull:{
                    msg:"Хэрэглэгчийн имэйл хаягийг оруулж өгнө үү"
                }
            }
		},
		role: {
			type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue:"user"
		},
		password: {
			type: DataTypes.STRING(100),
            allowNull: false,
            validate:{
                notNull:{
                    msg:"Хэрэглэгчийн нууц үг заавал оруулана уу"
                },
                // len: {
                //    args:[5,10],
                //    msg:"Нууц үгийн урт багадаа 5 тэмтэгт байна " 
                // }

            }
            //bcrypt ni promise butsaadag bolhoor bolohgui bsan
            // set:async (value)=> { 
            //     const salt = await bcrypt.genSalt(10);
            //     const pass = await bcrypt.hash(value, salt);
            //     this.setDataValue('password', pass);
            //   }
        },
        isactive:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: 1,
        },
        resetPasswordToken: {
            type:DataTypes.STRING
        },
        resetPasswordExpire: {
            type:DataTypes.DATE
        },
	}, {
		tableName: 'user',
		timestamps: false
    });

    user.prototype.getJsonWebToken = function () {
        const token = jwt.sign(
          { id: this._id, role: this.role },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRESIN,
          }
        );
      
        return token;
      };
      user.prototype.checkPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
      user.prototype.generatePasswordChangeToken = function () {
        const resetToken = crypto.randomBytes(20).toString("hex");
        this.resetPasswordToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");
        this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        return resetToken;
      };
    sequelizePaginate.paginate(user);
    user.beforeCreate(hashPassword);
    user.beforeUpdate(hashPassword);  
    user.beforeSave(hashPassword);
    return user;
};
var hashPassword = function (user, options) {
    if (!user.changed('password')) return
    return new Promise(function (resolve, reject) {
      bcrypt.hash(user.password, 10, function (err, hashedPassword) {
        if (err) reject(err)
        else resolve(hashedPassword)
      })
    }).then(function (hashedPassword) {
        user.password = hashedPassword
    })
  }