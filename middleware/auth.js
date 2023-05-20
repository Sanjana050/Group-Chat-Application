const jwt=require('jsonwebtoken');
const User=require('../models/user');
const secretKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1Njc4OTAiLCJwYXNzd29yZCI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.RetRZde-iKsRzO0G8oyCYPbIs4zV7S52ewqkbzAVjkA';
const authenticate=async(req,res,next)=>{
    try{

        console.log(req.message,"NEHA")
        const token=req.headers.token;
        console.log(token);
        const user=jwt.verify(token,secretKey);
        const user1=await User.findOne({where:{email:user.email}});
        if(user1)
        {
        req.user=user1;
        
        
        next();
        }
    }
    catch(err)
    {
        console.log(err)
    }

}
module.exports=authenticate;