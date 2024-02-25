     const btnRD = document.querySelector('#btnRD');
     const password = document.querySelector('#password');
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
         const RDbtn = document.querySelector('#btnRD');
         const btnLD = document.querySelector('#btnLD');
         const regbtn = document.querySelector('#btnR');
         
         //event listener
         loginbtn.addEventListener("click", () => {
       if(username.length === 0) {
      return;
              }
              
             const userinfo = {
                  name :username.value,
                  password: password.value
             }
             
             fetch('/user' , {
             method : 'POST',
            headers : {'content-type' : 'application/json'},
             body : JSON.stringify(userinfo)
             }).then(response => {
               if(response.status === 200) {
                    logincontainer.classList.add('hid');
               } else {
     console.log('user not found');
               }   
                  
             return response.text() }).then(data => {
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
              
            }).then(response => response.text()).then(data => {
          const parsedData = JSON.parse(data)
          reply3.textContent = parsedData.message;  
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
          fetch('MSG' , {
               
               method: 'POST',
               headers: {'Content-Type' : 'application/json'},
               body: JSON.stringify(UsermsgObj)
          });
          reply2.textContent = userMsgs;
          userMsg.value = '';
          userMsg.focus();
         });
         RDbtn.addEventListener('click', () => {
    if(logincontainer.style.display !== 'none') {
        logincontainer.style.display = 'none';
        Register.style.display = 'block';
    }
});

btnLD.addEventListener('click', () => {
    if(Register.style.display !== 'none') {
        Register.style.display = 'none';
        logincontainer.style.display = 'block';
    }
});