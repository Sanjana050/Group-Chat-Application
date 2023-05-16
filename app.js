const express=require('express');
const app=express();
const axios=require('axios')
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const path=require('path')

const signuprouter=require('./routers/signup');
app.use(signuprouter);

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