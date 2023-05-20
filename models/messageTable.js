const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const GrpMessage=sequelize.define('grpmessage',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
       
       

    },
    groupId:{
        type:Sequelize.INTEGER,
        allowNull:false,
      
       
    },
    messages:{
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
module.exports=GrpMessage;