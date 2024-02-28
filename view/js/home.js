window.onload = () => {
     const username = sessionStorage.getItem('username');
     fetch('/username')
    .then(response => response.text())
    .then(username => {
         if(!username || username.trim() === "") {
              window.location.href = 'http://localhost:3000/'
         } else {
              const MsgDiv = document.querySelector('.MsgDiv');
const userMsg = document.querySelector('#userMsg');

// Button
const msgbtn = document.querySelector('#msgbtn');

     msgbtn.addEventListener('click' , () => {
     const userMsgs = userMsg.value;
        const name = username;
        
        const UsermsgObj = {
            Mesg: userMsgs,
            name: username
        }; 
        
        fetch('/MSG', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(UsermsgObj)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Handle successful response
                // For example, you can log a success message
                console.log('Message sent successfully!');
            })
            .catch(error => {
                // Handle fetch errors
                console.error('Error sending message:', error);
            });
            
            MsgDiv.textContent = userMsgs;
            userMsg.value = '';
            userMsg.focus();
     })        
         }
    })
}