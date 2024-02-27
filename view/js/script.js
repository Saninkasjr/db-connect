const passR = document.querySelector('#passR');
     
     const username = document.querySelector('#username');
     const userR = document.querySelector('#userR');
     
         const logincontainer = document.querySelector('.container');
         const Register = document.querySelector('.Register');
         
         const reply = document.querySelector('.reply');
         const reply2 = document.querySelector('.reply2');
         const reply3 = document.querySelector('.reply3');
         
         const userMsg = document.querySelector('#userMsg');
         
         //buttons
         const msgbtn = document.querySelector('#msgbtn');
         
         const loginbtn = document.querySelector('#loginbtn');
         const regbtn = document.querySelector('#btnR');
         
         //event listener
         loginbtn.addEventListener("click", () => {
              const userinfo = {
                  name :username.value,
                  password: password.value
             }
             
             fetch('/user' , {
             method : 'POST',
            headers : {'content-type' : 'application/json'},
             body : JSON.stringify(userinfo)
             }).then(response => {
               if (response.status === 200) {
    console.log('user logging in')
    window.location.href = '/view/app.html';
}else {
     console.log('user not found');
               }   
                  
             return response.text()}).then(data => {
                  reply.textContent = `${data}`;
                  
             }).catch(error => {
                  console.log("error:",error);
                  
                  
                  reply.textContent = `ultimate error`  
                  
               
             });
         });
         regbtn.addEventListener('click', () => {
              
              const reginfo = {
              username: userR.value,
              password: passR.value
              }
              fetch("/reg" , {
               method: 'POST',
               headers: {'Content-Type' : 'application/json'}
              ,
              body: JSON.stringify(reginfo)
              
}).then(response => response.json())
  .then(data => {
      reply3.textContent = data.message;  
  }).catch( error => {
                   console.error('problem with fetch operation ',error)
              });
         });
         msgbtn.addEventListener('click', () => {
          const userMsgs = userMsg.value;
         const name = username.value;
          const UsermsgObj = {
          Mesg: userMsgs,
          name : name
          }
          fetch('/MSG' , {
               
               method: 'POST',
               headers: {'Content-Type' : 'application/json'},
               body: JSON.stringify(UsermsgObj)
          });
          reply2.textContent = userMsgs;
          userMsg.value = '';
          userMsg.focus();
         });
       