const chatController=require('../controllers/message');
const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/auth')
router.post('/sendMessage',authenticate,chatController.sendMessage);
module.exports=router;