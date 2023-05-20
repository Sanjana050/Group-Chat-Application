const User=require('../models/user');
const jwt = require('jsonwebtoken');
const Group=require('../models/group');
const userGrp=require('../models/user-group');
const messageTable=require('../models/messageTable')
const login=require('./login')
const secretKey='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1Njc4OTAiLCJwYXNzd29yZCI6IkpvaG4gRG9lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTUxNjIzOTAyMn0.mBXGconCVT-w6vURxnV4940y_7RKWpQYplKvoJMKbFE';
const loggedin=require('../models/login')
const path=require('path')
const adminGrp=require('../models/admin')
const { v4: uuidv4 } = require('uuid');

function getRandomInteger(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function generateToken(email,password,isAdmin){
    
    return jwt.sign({email:email,password:password,isAdmin:isAdmin}, secretKey);
}






exports.makeAdmin = async (req, res, next) => {
    try {
      const grpId = req.body.grpId;
      const userId = req.body.userId;
      console.log(grpId, userId, "nEHAGHGBHJ");
      const user = req.user;
      const userUpdate = await User.update({ isAdmin: true }, { where: { id: userId } });
      const userName=await User.findOne( { where: { id: userId } });
  
     
      const uuid = getRandomInteger(1,2147483647)

      const idfromgrp=await messageTable.findOne({where:{id:uuid}});
      if(idfromgrp)
      {
        uuid=getRandomInteger(1,2147483647)
      }

      adminGrp.create({

        id:uuid,
          groupId: grpId,
          adminId: userId,
          adminName:userName.name
        })
        .then(() => {
          console.log('done');
          res.status(200).json({ message: 'Admin added successfully' });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: 'Error adding admin', error: err });
        });
    }
    
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  };
  
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
        if(!createGrp){
            console.log("error in creating Grp Neha")
        }
        const userupdate=await User.update({isAdmin:true},{where:{id:req.user.id}});
        if(!userupdate)
        {
            console.log("error in line 94 group.js")
        }
        else{
            console.log("skflkjsefm")
        }

        // adminGrp.create({
        //   groupId: grpId,
        //   adminId: req.user.id,
        //   adminName:req.user.name
        // }).then(()=>{
        //     console.log('admin added and group will be created')
        // }).catch((err)=>{
        //     console.log(err)
        // })

        const token= generateToken(user.email,user.password,user.isAdmin)
        if(!token)
        {
            console.log('token not craeted')
        }
        console.log("token in line 98",token )
        if(createGrp)
        {
res.status(200).json({"success":"true","message":"Group created successfully",grp:createGrp,token:token})
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
                name:userexists.name
               })
               if(!userGrpcreate)
{
    
    return res.status(401).json({success:false,message:"failed to create group"})
}
else{
    console.log(">>>>>neha")
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

exports.getGroupMembers=async(req,res,next)=>{
    try{

    
    const user=req.user.id;
    console.log(user);
    console.log(req.body.grpId)
    let arr=[];
    const members=await userGrp.findAll({where:{groupId:req.body.grpId}});
    if(members)
    {
 await members.forEach( (member)=>{
const obj= {name:member.name,id:member.userId};
arr.push(obj);
    })

    res.status(200).json({success:true,members:arr})
}


    else{
        console.log('not found members')
    }
    

}

catch(err)
{
console.log("Neha",err)
}
}
exports.isAdmin=async(req,res,next)=>{
    const userId=req.user.id;
    const isAdmin=await User.findOne({where:{id:userId}});
    if(isAdmin)
    {
        res.status(200).json({success:true,isAdmin:isAdmin.isAdmin})
    }
    else{
        console.log('could not find user')
    }
}
exports.removeUser=async(req,res,next)=>{
    console.log(req.body.userId,req.body.grpId);
    const userId=req.body.userId;
    const grpId=req.body.grpId;


    const grp=await Group.findOne({where:{id:grpId}})
    if(grp){

       console.log(grp.dataValues)
        const grpDetails=grp.dataValues;
        const grpMemberRemove=await userGrp.findOne({where:{groupId:grpId,userId:userId}});
        if(grpMemberRemove){
            const memRemove=await userGrp.destroy({where:{groupId:grpId,userId:userId}})
            if(memRemove)
            {
                 



                console.log('user removed')

                const user=await User.findOne({where:{id:userId}});
if(user)
{
    const username=user.name;
    if(grp.createdBy===username)

    {
        console.log('you are the admin')
         res.status(201).json({message:"you are no longer an admin"})
    }
    else{

        res.status(200).json({success:true,message:"user removed from group"});
        
    }
}

               
            }
           
            else{
                    console.log('could not remove user')
                   
            }
        }
        else{
            console.log('could not findUser to remove')
        }
      
    }
}