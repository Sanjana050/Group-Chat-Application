const express=require('express');
const router=express.Router();
const loginController=require('../controllers/login')

router.post('/postlogin',loginController.postLogin);
module.exports=router;