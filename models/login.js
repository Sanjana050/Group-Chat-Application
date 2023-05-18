const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const loggedin=sequelize.define('loggedin',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    email:Sequelize.STRING,
    password:Sequelize.STRING
    ,
    name:Sequelize.STRING
})
module.exports=loggedin;