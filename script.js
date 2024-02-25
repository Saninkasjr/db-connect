const username = document.querySelector('#username');
         const logincontainer = document.querySelector('.container');
         const reply2 = document.querySelector('.reply2');
         const reply = document.querySelector('.reply');
         const userMsg = document.querySelector('#userMsg');
         const msgbtn = document.querySelector('#msgbtn');
         const loginbtn = document.querySelector('#loginbtn');
         
         
         loginbtn.addEventListener("click", () => {
       if(username.length === 0) {
      return;
              }
              
             const userinfo = {
                  name :username.value
             }
             
             fetch('/user' , {
             method : 'POST',
            headers : {'content-type' : 'application/json'},
             body : JSON.stringify(userinfo)
             }).then(response => response.json()).then(data => {
                  
                  
                  reply.textContent = `${data} is not available`;
             }).catch(error => {
                  console.log("error:",error);
                  
                  reply.classList.add('green');
                  reply.textContent = `${userinfo.name} is available ✅` ;  
               //logincontainer.classList.add('hid');
             });
         });
         msgbtn.addEventListener('click', () => {
          const userMsgs = userMsg.value;
          const UsermsgObj = {
          Mesg: userMsgs
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