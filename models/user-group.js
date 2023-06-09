const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const userGroup=sequelize.define('usergroup',{
id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
},
name:{
    type:Sequelize.STRING,
    allowNull:false
}
})

module.exports=userGroup;