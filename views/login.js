



async function login(e)
{

    e.preventDefault();


const email=document.querySelector('#email').value;
const password=document.querySelector('#password').value;
    console.log("1.",email,password)

    const response= await axios.post('http://localhost:3000/postlogin',{"email":email,"password":password});
    

    
if(response.status===200){
    localStorage.setItem(email,response.data.token);
    console.log(response.data.message,response.data.token,email,"nehaa");

    location.href=`./chat.html?message=${email}`
}
else if(response.status===300)
{
   
    console.log(response.data.message,response.data.token,email,"nehaa");
     location.href=`./chat.html`
}
else{
    console.log(response.err);
}
}

document.querySelector('#loginbtn').addEventListener('click',login);
