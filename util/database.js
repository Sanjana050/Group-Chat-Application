const Sequelize=require('sequelize');
const sequelize=new Sequelize('groupchatapp','root','Neha@5678',{dialect:'mysql',host:'chatfinal.cxuthawotyly.us-east-1.rds.amazonaws.com'})
module.exports=sequelize;
