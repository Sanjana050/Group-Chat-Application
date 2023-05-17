const express=require('express');
const app=express();
const cors=require('cors')
const axios=require('axios')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const path=require('path')
app.use(cors({origin:'localhost:3000/postlogin'}))
const signuprouter=require('./routers/signup');
app.use(signuprouter);
const loginrouter=require('./routers/login');
app.use(loginrouter);

app.use(express.static(path.join(__dirname,'views')));
const Sequelize=require('sequelize');
const sequelize=require('./util/database');

app.use('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','signup.html'))
})

sequelize.sync().then(()=>{
    app.listen(3000);
}).catch((err)=>{
    console.log(err);
})