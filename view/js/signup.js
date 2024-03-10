const passR = document.querySelector('#passR');
const userR = document.querySelector('#userR');
const logincontainer = document.querySelector('.container');
const Register = document.querySelector('.Register');

const reply3 = document.querySelector('.reply3');
const regbtn = document.querySelector('#btnR');
regbtn.addEventListener('click', () => {
  if (userR.value.trim() === "" || passR.value.trim() === "") {
    if (userR.value.trim() === "") {
      userR.placeholder = 'no password entered'
      userR.style.outline = 'solid red'
    } else {
      userR.style.outline = 'solid green'
    }
    if (passR.value.trim() === "") {
      passR.placeholder = 'no username entered'
      passR.style.outline = 'solid red'
    } else {
      passR.style.outline = 'solid green'
    }
  } else {
    const reginfo = {
      username: userR.value,
      password: passR.value
    };
    fetch("/reg", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reginfo)
    }).then(response => response.json())
      .then(data => {
        reply3.textContent = data.message;
        if (reply3.textContent === `the username ${userR.value}  already exists`) {
          passR.style.outline = 'solid red'
          userR.style.outline = 'solid red'
          reply3.style.color = 'red'
        } else {
          passR.style.outline = 'solid green'
          userR.style.outline = 'solid green'
          reply3.style.color = 'green'
        }
      })
      .catch(error => {
        console.error('Problem with fetch operation:', error);
      });
  }
});