



async function login(e)
{
    e.preventDefault();
    const email=document.querySelector('#email').value;
const password=document.querySelector('#password').value;
    console.log("1.",email,password)
    const response= await axios.post('http://localhost:3000/postlogin',{"email":email,"password":password});
    console.log(response,"NEHA")
if(response.status===200){
    console.log(response.data.message,response.data.token);
    location.href='./chat.html'
}
else{
    console.log(response.err);
}
}

document.querySelector('#loginbtn').addEventListener('click',login);
