const express=require('express');
const router=express.Router();
const groupController=require('../controllers/group');
const authenticate=require('../middleware/auth')
router.post('/createGrp',authenticate,groupController.createGrp);
router.get('/mygrps',authenticate,groupController.getmyGrps);
router.post('/openGrp',groupController.getGrpChat);
router.post('/getAllMessagesofGrpChat',authenticate,groupController.getGroupMessages)
router.post('/sendMessageInGrp',authenticate,groupController.sendMessageinGrp)
module.exports=router;