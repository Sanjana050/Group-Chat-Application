const jwt=require('jsonwebtoken');
const User=require('../models/user');
const secretKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1Njc4OTAiLCJwYXNzd29yZCI6IkpvaG4gRG9lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxNjIzOTAyMn0.mBXGconCVT-w6vURxnV4940y_7RKWpQYplKvoJMKbFE';
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