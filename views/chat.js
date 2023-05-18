const users1=document.querySelector('.users');
const urlParams = new URLSearchParams(window.location.search);
const email=urlParams.get('message');

let j=0;

async function sendMessage(e)
{
    e.preventDefault();
    const message=document.querySelector('.messageboxinput').value;
    console.log(email)
    console.log(message)
    const response=await axios.post('http://localhost:3000/sendMessage',{message:message},{headers:{token:localStorage.getItem(email)}});
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

const messages=await axios.get('http://localhost:3000/getMessage');
if(messages)
{
const arr=messages.data.messageArr
await arr.forEach((m)=>{
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






}

document.querySelector('.messagesend').addEventListener('click',sendMessage)
window.addEventListener('DOMContentLoaded',showUsers);