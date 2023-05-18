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
    console.log(chatCreate.id,'this is id from chat db')
    console.log('NEHAA')
    res.status(200).json({message:"chat printed on the screen ",user:req.user,messageId:chatCreate.id})
}
else{
    res.status(300).json({message:"chat could not be printed",success:false})
}
 
   

}


exports.getMessage=async(req,res,next)=>{
    const messageArr=await Chat.findAll();
    console.log(messageArr);
    if(messageArr)
    res.status(200).json({message:"all messages",messageArr:messageArr})
else{
    res.status(401).json({message:"could not retrieve messages"})
}
}