

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

send.addEventListener('click',sendMessage);
window.addEventListener('DOMContentLoaded',loadUI)




