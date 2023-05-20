const users1=document.querySelector('.users');
const urlParams = new URLSearchParams(window.location.search);
const email=urlParams.get('message');
const old=document.querySelector('.old');
const createBtn=document.querySelector('.createbtn')


const container=document.querySelector('.container')

const grpName=document.querySelector('.grpName')
const creategrp=document.querySelector('.creategrp');


creategrp.addEventListener('click',()=>{creategrp.style.visibility="hidden";
document.querySelector('.grpNameinput').style.visibility="visible"
})



function function1(e)
    {
    
        console.log(document.querySelector('.inputgrpName').value);
        document.querySelector('.userList').style.visibility="visible"
    
}

document.querySelector('.grpbtn').addEventListener('click',function1);

function function2(e){
    const user=document.querySelector('.userListName').value;
    console.log(user);
    const div=document.createElement('div');
    div.className="usersadded"
    const userName=document.createTextNode(`${user}`);
    div.appendChild(userName);
    div.style.backgroundColor="grey";
    div.style.color="white"
    div.style.width="10rem"
    div.style.padding=".2rem"
    div.style.margin=".1rem"
    document.querySelector('.userGrpList').appendChild(div);

    document.querySelector('.userListName').value="";
    document.querySelector('.createbtn').style.visibility="visible"


}
document.querySelector('.userListbtn').addEventListener('click',function2);

let j=0;

async function sendMessage(e)
{
    e.preventDefault();
    const message=document.querySelector('.messageboxinput').value;
    console.log(email)
    console.log(message)
    const response=await axios.post('http://localhost:3000/sendMessage',{message:message},{headers:{token:localStorage.getItem(email)}});
    storeinLS(message,response.data.messageId,response.data.name)
    console.log(response,"NEHAAAAA");
    const li=document.createElement('li');
    let text=document.createTextNode(response.data.user.name+" : "+message);
    
    li.appendChild(text);
    if(j%2===0)
    {
        li.style.backgroundColor="black";
        
    }
    else{
        li.style.backgroundColor="grey"
    }
    j++;

    
    users1.appendChild(li);
    
    document.querySelector('.messageboxinput').value="";
   

     
    
}
function getMessageFromLS() {
    let messagesString = localStorage.getItem('messages');
    let messages = [];
    
    try {
      messages = JSON.parse(messagesString) || [];
    } catch (error) {
      console.error('Error parsing messages:', error);
    }
    
    return Array.isArray(messages) ? messages : [];
  }
  
  
  function storeinLS(message, id,name) {
    let arr = getMessageFromLS();
    
    
    const newMessage = { id: id, data: message,name:name };
    arr.push(newMessage);
    if(arr.length>10)
    {
        while(arr.length>10)
        {
            arr.shift();

        }
    }
    
    localStorage.setItem('messages', JSON.stringify(arr));

  }
  
async function showUsers(e){
 e.preventDefault();

const response=await axios.get('http://localhost:3000/getloggedInUsers');

const users=response.data.users;


let i=0;
await users.forEach((user)=>{
   
    const li=document.createElement('li');
    const userName=document.createTextNode(`${user}  joined`);
    li.appendChild(userName);
    if(i%2===0)
    {
        li.style.backgroundColor="black";
        
    }
    else{
        li.style.backgroundColor="grey"
    }
    i++;
    users1.appendChild(li);
    

})


//const messages=await axios.get('http://localhost:3000/getMessage');


const arr= getMessageFromLS();

if(arr)
{
//const arr=messages.data.messageArr

 arr.forEach((m)=>{
    const name=m.name;
    const data=m.data

    const li=document.createElement('li');
    let text=document.createTextNode(name+" : "+data);
    
    li.appendChild(text);
    if(j%2===0)
    {
        li.style.backgroundColor="black";
        
    }
    else{
        li.style.backgroundColor="grey"
    }
    j++;

    
    users1.appendChild(li);
})
}
else{
    console.log('no messages found')
}

 users1.scrollTop = users1.scrollHeight;
 

}
async function loadLocalStorage(){
    const messages=await axios.get('http://localhost:3000/getMessage');
console.log(messages,">>>neha<<<")

     if(messages)
{
const arr=messages.data.messageArr

await arr.forEach((m)=>{
   
    const data=m.message;
    const id=m.id;
    const name=m.name;


   storeinLS(data,id,name);


    
    
})
}
else{
    console.log('no messages found')
}

}

async function loadAllMessages(e)
{
    e.preventDefault();

const response=await axios.get('http://localhost:3000/getloggedInUsers');

const users=response.data.users;


let i=0;
await users.forEach((user)=>{
   
    const li=document.createElement('li');
    const userName=document.createTextNode(`${user}  joined`);
    li.appendChild(userName);
    if(i%2===0)
    {
        li.style.backgroundColor="black";
        
    }
    else{
        li.style.backgroundColor="grey"
    }
    i++;
    users1.appendChild(li);
    

})


const messages=await axios.get('http://localhost:3000/getMessage');
console.log(messages,"NEHA FOR OLDER MESSAGES")

const messageArr=messages.data.messageArr;

if(messages)
{
const arr=messages.data.messageArr;

 arr.forEach((m)=>{
    const name=m.name;
    const data=m.message

    const li=document.createElement('li');
    let text=document.createTextNode(name+" : "+data);
    
    li.appendChild(text);
    if(j%2===0)
    {
        li.style.backgroundColor="black";
        
    }
    else{
        li.style.backgroundColor="grey"
    }
    j++;

    
    users1.appendChild(li);
})
}
else{
    console.log('no messages found')
}

 users1.scrollTop = users1.scrollHeight;
 

}
async function createGrp(e)
{
    e.preventDefault();
    console.log("NEHA")
    const grpName=document.querySelector('.inputgrpName').value;
    
    let user;
    let postuser=[];
    user=document.getElementsByClassName('usersadded')
    console.log(user)
    const u=Array.from(user)
u.forEach((user1)=>{
    console.log(user1.innerHTML)
    postuser.push(user1.innerHTML)
})

console.log(postuser)
postuser.push(email);
    const createGrp=await axios.post('/createGrp',{grpName,postuser},{headers:{token:localStorage.getItem(email)}});
    if(createGrp)
    {
        console.log('group Created', createGrp);
        
        location.href = `./grpchat.html?name=${grpName}&grpId=${createGrp.data.grp.id}&email=${email}`;

        
    }


    

    

}

function loadUI(){
    const arr=getMessageFromLS();
    console.log("LOADINGUI")
    console.log(arr.length)
    console.log(arr[arr.length-1].data,arr[arr.length-1].id,arr[arr.length-1].name)
}
window.addEventListener('DOMContentLoaded',loadUI);
window.addEventListener('DOMContentLoaded',loadLocalStorage)
document.querySelector('.messagesend').addEventListener('click',sendMessage)
window.addEventListener('DOMContentLoaded',showUsers);

old.addEventListener('click',loadAllMessages);
createBtn.addEventListener('click',createGrp);

const yourgrpbtn=document.querySelector('.yourgrpbtn');
async function showyourgroups(e)
{
    e.preventDefault();
    console.log('your groups');
    console.log(localStorage.getItem(email));
    const group=await axios.get('/mygrps',{headers:{token:localStorage.getItem(email)}});
    if(group)
    {
     const arr=group.data.groups;
     
     for(let i=0;i<arr.length;i++)
     {
        let grp=arr[i];
        console.log(grp);
        const li=document.createElement('button');
        const text=document.createTextNode(`${grp.name}`)
        li.appendChild(text);
        li.style.listStyle="none";
        li.id=`${grp.id}`
    
        li.classList.add("groups");
        li.addEventListener('click',grpChat1);
        document.querySelector('.grouplist').append(li);
     }
       



    }
    else{
        console.log('no grps found')
    }


}
yourgrpbtn.addEventListener('click',showyourgroups);

function grpChat1(e)
{
    e.preventDefault();
    console.log(e.target);
    const id=e.target.id;
    console.log(id);
    console.log(e);
    const grpName=e.target.innerText;
    console.log(grpName)


    location.href = `./grpchat.html?name=${grpName}&grpId=${e.target.id}&email=${email}`;
    
}