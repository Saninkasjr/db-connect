
window.onload = () => {
function displayMessages() {
  fetch('/message', {
    headers: { 'Content-Type': 'application/json' },
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    const MsgDiv = document.querySelector('.MsgDiv');
    MsgDiv.innerHTML = ''; // Clear previous messages

    data.forEach(item => {
      const { name, message } = item;

      const nameElem = document.createElement('p');
      nameElem.textContent = `${name}: ${message}`;
      nameElem.style.maxWidth = '350px'; // Set max width directly

      MsgDiv.appendChild(nameElem);
    });
  })
  .catch(error => {
    console.error('Error fetching messages:', error);
  });
}

// Call displayMessages immediately and then every 5 seconds
/*displayMessages();
setInterval(displayMessages, 5000);*/
  const username = sessionStorage.getItem('username');
  fetch('/username')
    .then(response => response.text())
    .then(username => {
      if (!username || username.trim() === "") {
        window.location.href = 'http://localhost:3000/'
      } else {
        const MsgDiv = document.querySelector('.MsgDiv');
        const userMsg = document.querySelector('#userMsg');

        // Button
        const msgbtn = document.querySelector('#msgbtn');

        msgbtn.addEventListener('click', () => {
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
          const msgCon = document.createElement('p');
msgCon.textContent = userMsgs;

// Append the element to the body temporarily to calculate its width
document.body.appendChild(msgCon);

// Get the width
var textWidth = msgCon.offsetWidth;

// Remove the element from the body
msgCon.parentNode.removeChild(msgCon);

// Set the calculated width, ensuring it doesn't exceed a max-width
var maxWidth = 350; // Example max-width value
msgCon.style.width = Math.min(textWidth, maxWidth) + "px";

// Set max-width property
msgCon.style.maxWidth = maxWidth + "px";

// Append the element to its container
MsgDiv.appendChild(msgCon);

// Clear the input and focus
userMsg.value = '';
userMsg.focus();
        })
      }
    })
    const mytextbox = document.querySelector(".mytextbox");

    // mytextbox.addEventListener("input", adjustTextareaHeight);
//     mytextbox.addEventListener("blur", adjustTextareaHeight);
//     mytextbox.addEventListener("focus", adjustTextareaHeight);

    mytextbox.addEventListener("input", function(){
            this.style.height = "auto";
            this.style.height = `${this.scrollHeight}px`;
        });
}

    
