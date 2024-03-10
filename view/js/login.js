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
  if (username.value.trim() === "" || password.value.trim() === "") {
    if (username.value.trim() === "") {
      username.placeholder = 'no password entered'
      username.style.outline = 'solid red'
    } else {
      username.style.outline = 'solid green'
    }
    if (password.value.trim() === "") {
      password.placeholder = 'no username entered'
      password.style.outline = 'solid red'
    } else {
      password.style.outline = 'solid green'
    }
  } else {
    fetch('/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userinfo)
    }).then(response => {
      if (response.status === 200) {


        sessionStorage.setItem('username', response.username)
        if (username.value === 'admn') {
          console.log('admn detected')
          window.location.href = '/admn'
        } else {
          window.location.href = '/view/app.html'
          console.log('user logging in')
          username.style.outline = 'solid green'
          password.style.outline = 'solid green'
          username.style.color = 'green'
        }
      } else {
        console.log('user not found');
      }
      return response.json();
    }).then(data => {
      reply.textContent = `${data.message}`;
      if (reply.textContent === `user: '${username.value}' not found`) {
        reply.style.color = 'red'
        username.style.outline = 'solid red'
        username.style.color = 'red'
        password.style.outline = 'solid red'
      } else {
        reply.style.color = 'rgba(0,200,0,1)'
      }

    }).catch(error => {
      console.log("error:", error);
      reply.textContent = `.....E`;
    });
  }
});