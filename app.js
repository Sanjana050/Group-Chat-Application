const express=require('express');
const app=express();
const cors=require('cors')
const axios=require('axios')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const Chat=require('./models/chat');
const Login=require('./models/login');
const  User=require('./models/user')
const path=require('path')
const chatRoute=require('./routers/chat');
app.use(cors({origin:'localhost:3000/postlogin'}))
const signuprouter=require('./routers/signup');
app.use(signuprouter);
const loginrouter=require('./routers/login');
app.use(loginrouter);
app.use(chatRoute)
app.use(express.static(path.join(__dirname,'views')));
const Sequelize=require('sequelize');
const sequelize=require('./util/database');

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'))
})

User.hasMany(Login);
Login.belongsTo(User);


User.hasMany(Chat);
Chat.belongsTo(User);





sequelize.sync().then(()=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
})