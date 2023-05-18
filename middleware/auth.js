const jwt=require('jsonwebtoken');
const User=require('../models/user');
const secretKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmphbmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.ex8WIWs1CaF8riXrwR-TtHswUYgP3-z7pBnNtL8ROpE';
const authenticate=async(req,res,next)=>{
    try{

        console.log(req.message,"NEHA")
        const token=req.headers.token;
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