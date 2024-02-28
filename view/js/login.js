const password = document.querySelector('#password');
const username = document.querySelector('#username');
const reply = document.querySelector('.reply');
const loginbtn = document.querySelector('#btn');

// Event listener
loginbtn.addEventListener("click", () => {
    const userinfo = {
        name: username.value,
        password: password.value
    }
       if(username.value.trim() === "" || password.value.trim() === "") {
        alert("Empty fields detected, you're banned!");
    } else {
    fetch('/user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userinfo)
    }).then(response => {
        if (response.status === 200) {
            
                 sessionStorage.setItem('username' ,response.username)
            
            console.log('user logging in')
            window.location.href = '/view/app.html';
        } else {
            console.log('user not found');
        }
        return response.text();
    }).then(data => {
        reply.textContent = `${data}`;
    }).catch(error => {
        console.log("error:", error);
        reply.textContent = `ultimate error`;
    });
    }
});