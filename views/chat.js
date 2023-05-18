const users1=document.querySelector('.users');
const urlParams = new URLSearchParams(window.location.search);
const email=urlParams.get('message');
const old=document.querySelector('.old');

container=document.querySelector('.container')



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


  
  

  