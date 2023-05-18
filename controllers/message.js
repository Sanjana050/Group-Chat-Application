const Chat=require('../models/chat');
const User=require('../models/user');



exports.sendMessage=async(req,res,next)=>{
    console.log('>>>>NEHA')
    console.log(req.user.id);
   const userId=req.user.id;
   const name=req.user.name;
   const email=req.user.email;
   const password=req.user.password;
const chatCreate=await Chat.create({
    name:name,
    email:email,
    password:password,
    message:req.body.message,
    userId:userId
})
if(chatCreate)
{
    console.log(req.body.message)
    console.log('NEHAA')
    res.status(200).json({message:"chat printed on the screen ",user:req.user})
}
else{
    res.status(300).json({message:"chat could not be printed",success:false})
}
 
   

}