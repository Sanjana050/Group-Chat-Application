const chatController=require('../controllers/message');
const express=require('express');
const router=express.Router();
const authenticate=require('../middleware/auth')
router.post('/sendMessage',authenticate,chatController.sendMessage);
router.get('/getMessage',chatController.getMessage)
module.exports=router;