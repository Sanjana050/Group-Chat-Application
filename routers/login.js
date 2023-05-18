const express=require('express');
const router=express.Router();
const loginController=require('../controllers/login')

router.post('/postlogin',loginController.postLogin);
router.get('/getloggedInUsers',loginController.getloggedInUsers)
module.exports=router;