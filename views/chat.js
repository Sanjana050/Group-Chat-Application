const users=document.querySelector('.users');

async function showUsers(e){
e.preventDefault();
const li=document.createElement('list');
const userName=document.createTextNode(`You joined`);
li.appendChild(userName);
users.appendChild(li);
}

window.addEventListener('DOMContentLoaded',showUsers);