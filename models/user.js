const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const User=sequelize.define('users',{
id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
},
name:{
    type:Sequelize.STRING,
    allowNull:false
},
email:{
    type:Sequelize.STRING,
    allowNull:false
},
password:{
    type:Sequelize.STRING,
    allowNull:false
},
phone:{
    type:Sequelize.STRING,
    allowNull:false
},
isAdmin:{
    type:Sequelize.BOOLEAN,
    defaultValue:false
}

})

module.exports=User;