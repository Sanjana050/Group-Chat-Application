


async function postsignup(e){
    try{
        e.preventDefault();
        const name=document.getElementById('name').value;
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const phone=document.getElementById('phone').value;
        console.log(name,email,password,phone)
        const response=await axios.post('http://localhost:3000/postsignup',{"name":name,"email":email,"password":password,"phone":phone});
        if(response.status===200)
        {
            location.href = './loginPage.html?message=User added successfully!';

        }
        
        else{
            console.log('problem occurred while adding user');
         
        }
    }
    catch(err)
    {
        console.log(err.response.data.message);
        setTimeout(()=>{
            document.querySelector('#error-message').textContent=err.response.data.message;
        }
        ,2000)
console.log('login')
       
console.log(err);
        }

        


}


document.querySelector('#signupbtn').addEventListener('click',postsignup)


