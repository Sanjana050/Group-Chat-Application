const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const chat=sequelize.define('chat',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
   
    message:{
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
        
    }
})
module.exports=chat;