const signupController=require('../controllers/signup');

const express=require('express');
const router=express.Router();
router.post('/postsignup',signupController.postSignup);
module.exports=router;