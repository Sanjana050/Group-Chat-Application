const express=require('express');
const router=express.Router();
const groupController=require('../controllers/group');
const authenticate=require('../middleware/auth')
router.post('/createGrp',authenticate,groupController.createGrp);
router.get('/mygrps',authenticate,groupController.getmyGrps);
router.post('/openGrp',groupController.getGrpChat);
router.post('/getAllMessagesofGrpChat',authenticate,groupController.getGroupMessages)
router.post('/sendMessageInGrp',authenticate,groupController.sendMessageinGrp);
router.post('/getGrpMembers',authenticate,groupController.getGroupMembers);
router.get('/isAdmin',authenticate,groupController.isAdmin);
router.post('/removeUser',authenticate,groupController.removeUser);
router.post('/makeAdmin',groupController.makeAdmin);
module.exports=router;