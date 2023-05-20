const User=require('../models/user');
const Group=require('../models/group');
const userGrp=require('../models/user-group');
const messageTable=require('../models/messageTable')


exports.createGrp=async(req,res,next)=>{
    try{
        const grpname=req.body.grpName;
        const users=req.body.postuser;
       
        const user=req.user;
        const createdBy=user.name;
    
        console.log(grpname,users,createdBy);
         const createGrp=await Group.create({
            name:grpname,
            createdBy:createdBy,
            userId:user.id



        })

        if(createGrp)
        {
res.status(200).json({"success":"true","message":"Group created successfully",grp:createGrp})
        }
        else{
res.status(301).json({success:false,message:"errors while creating grp ,try again"})
        }
    
                    
         await users.forEach(async(u)=>{
            const userexists=await User.findOne({where:{email:u}});
            if(userexists)
            {
               await  userexists.update({groupId:createGrp.id});
               const userGrpcreate=await userGrp.create({
                userId:userexists.id,
                groupId:createGrp.id,
                name:createGrp.name
               })
               if(!userGrpcreate)
{
    return res.status(401).json({success:false,message:"failed to create group"})
}



            }
            else{
                console.log('could not find user')
            
            }
        })

           
            
       

        
    }
    catch(err)
    {
        res.status(500).json({message:"internal server error"})
    }
    
}

exports.getmyGrps=async(req,res,next)=>{
    console.log(req.user.dataValues.id);
    const userId=req.user.dataValues.id;
    const grps=await userGrp.findAll({where:{userId:userId}});
    if(grps)
    {
   console.log("NEHA",grps)
    let ans=[];
    grps.forEach((grp)=>{
        const obj={name:`${grp.dataValues.name}`,id:`${grp.dataValues.id}`};
        ans.push(obj)
    })
        console.log(ans);
        res.status(200).json({message:"user recived",groups:ans})
    }
    else{
        console.log('grps not received')
    }
   
}

exports.getGrpChat=async(req,res,next)=>{
    const id=req.body.grpId;
    const messages=await messageTable.findAll({where:{groupId:id}});
    if(messages)
    {
console.log("SANJANA",messages,"SANJANA")
    }

    
    
}

exports.sendMessageinGrp=async(req,res,next)=>{
    const id=req.user.id;
    const name=req.user.name;

    const message=req.body.message;

    const email=await User.findOne({where:{id:id}});
    if(email)
    {
    console.log(email)
    const updating_message=await messageTable.create({
        userId:id,
        
        groupId:req.body.groupId,
        messages:message,
        name:req.user.name
    })
    if(updating_message)
    {
        res.status(200).json({success:true,"message":"message added to group","userName":name})
    }
    else{
        res.status(300).json({success:false,"message":"message could not be added to group"})
    }
    }
    else{
        console.log("email not found")
    }
console.log(req.user.id,message);
}

exports.getGroupMessages=async(req,res,next)=>{
    console.log(req.user.id);
    console.log(req.body.groupId);
    let arr=[];
    const grpMessages=await messageTable.findAll({where:{groupId:req.body.groupId}});
    if(grpMessages)
    {
      
       grpMessages.forEach((grpMessage)=>{
        const obj={name:grpMessage.name,message:grpMessage.messages};
        arr.push(obj)
       })

       console.log(arr,"jsckjmfkwm");
       res.status(200).json({success:true,messageArr:arr})

            
        
       
        
    }
    else{
        res.status(301).json({success:false,"message":"could not retrieve any message"})
    }
    


}