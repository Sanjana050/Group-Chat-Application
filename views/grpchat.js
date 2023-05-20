


const urlParams=new URLSearchParams(window.location.search);
const id=urlParams.get('grpId');
const email=urlParams.get('email');
const messageboxinput=document.querySelector('.messageboxinput');
const groupId=urlParams.get('grpId')
const send=document.querySelector('.messagesend');



async function openGroupChat(e){
    
e.preventDefault();

console.log(id);
const getMessage=await axios.post('/openGrp',{grpId:id},)

}
async function sendMessage(e){

    const message=messageboxinput.value;
    const postMessageInGrp=await axios.post('/sendMessageInGrp',{message:message,groupId:groupId},{headers:{token:localStorage.getItem(email)}})
    if(postMessageInGrp)
    {
console.log(postMessageInGrp,postMessageInGrp.status)
if(postMessageInGrp.status===200)
{
const name=postMessageInGrp.data.userName;
const li=document.createElement('li');
const text=document.createTextNode(`${name}: ${message}`);
li.appendChild(text);
li.className="groupM"
document.querySelector('.messages').appendChild(li);
document.querySelector('.messageboxinput').value="";


}
    }
    else{
        console.log("did not receive response")
    }
 

}

async function loadUI(e){
    e.preventDefault();
    const allMessages=await axios.post('/getAllMessagesofGrpChat',{groupId:groupId},{headers:{token:localStorage.getItem(email)}});
    if(allMessages)
    {
        const arr=allMessages.data.messageArr
        console.log(allMessages.data.messageArr);
        arr.forEach((a)=>{
            const name=a.name;
            const message=a.message;
            const li=document.createElement('li');
            li.className="groupM"
 const text=document.createTextNode(`${name}: ${message}`);
    li.appendChild(text);
    document.querySelector('.messages').appendChild(li);


        })
    }
    else{
        console.log('did not receive any message')
    }
}



async function groupOptions(e)
{
    console.log(e.target);
    
    isAdmin=await axios.get('/isAdmin',({headers:{token:localStorage.getItem(email)}}));
    console.log(isAdmin)
    if(isAdmin.data.isAdmin===false)
    {
        alert('you are not an admin')
    }
    else{

    console.log(e,e.target.id);

    const dropdown=document.createElement('div');
    dropdown.classList.add(e.target.id)
    const option1=document.createElement('button');
    option1.classList.add("btnoption")
    option1.classList.add(e.target.id);
     const isAdmin1=isAdmin.data.isAdmin;
    let textAdmin="";
    if(isAdmin1)
    {
textAdmin="admin";
    }
    else{
        textAdmin="make admin"
    }
    option1.appendChild(document.createTextNode(`${textAdmin}`))
    option1.value='make Admin';

    option1.addEventListener('click',async(e)=>{
    console.log(e.target.parentElement.parentElement.parentElement.firstElementChild);
    console.log(e.target)
    const classList = e.target.classList;


      const lastClassName = classList.item(classList.length - 1);
       console.log(lastClassName)
       const userId=lastClassName;
       const grpId=groupId;

       console.log(userId,grpId)
       const makeAdminres=await axios.post('/makeAdmin',{grpId:grpId,userId:userId},{headers:{token:localStorage.getItem(email)}});
       if(makeAdminres){
        
        console.log(userId,"made admin of",grpId);
        alert(`${userId} made admin of ${grpId}`);
        console.log(e.target.parentElement.firstElementChild)
        e.target.parentElement.firstElementChild.innerHTML="admin"
        e.target.parentElement.remove();


       }
})
    
    dropdown.appendChild(option1);
    
    const option2=document.createElement('button');
    option2.appendChild(document.createTextNode('remove User'))
    option2.classList.add("btnoption")
    option2.classList.add(e.target.id)
    
    option2.id="usero"
    
    option2.addEventListener('click', async(e) => {
          
        console.log('neha')
        console.log(e.target.parentElement.parentElement.parentElement.firstElementChild);
        console.log(e.target)
        
        const classList = e.target.classList;


      const lastClassName = classList.item(classList.length - 1);
       console.log(lastClassName)
       const userId=lastClassName;
       const grpId=groupId;
       const delUser=await axios.post('/removeUser',{grpId:groupId,userId:userId},{headers:{token:localStorage.getItem(email)}})
if(delUser)
{

if(delUser.status===201)
{
    console.log(delUser.message)
    location.href="./chat.html&message:email"
}
else{


    console.log(e.target.firstElementChild)
    console.log('user removed')
    location.reload();
}
}

    })

      
   

      
   
    dropdown.appendChild(option2);
   document.querySelector('.adminOptions').appendChild(dropdown);


}
}
async function getGroupMembers(e)
{
    e.preventDefault();
    const members=await axios.post('/getGrpMembers',{grpId:groupId},{headers:{token:localStorage.getItem(email)}})
    let arr=[];
    if(members)
    {
        console.log("MEMBERS",members)
        members.data.members.forEach((member)=>{
            const obj={name:member.name,id:member.id}
            arr.push(obj)
        })
        
        console.log(members.data.members);
        console.log(arr);
        arr.forEach((member)=>{
            const button=document.createElement('button');
            const text=document.createTextNode(`${member.name}`);
            button.className="btn";
            button.appendChild(text);
            button.id=(member.id)
            document.querySelector('.memberName').appendChild(button);
            button.addEventListener('click',groupOptions);
        })
        
       
    }
    else{
        console.log('grp members not received');
    }

}
send.addEventListener('click',sendMessage);
window.addEventListener('DOMContentLoaded',loadUI)
document.querySelector('#grpmem').addEventListener('click',getGroupMembers)




