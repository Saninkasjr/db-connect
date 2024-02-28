     const passR = document.querySelector('#passR');
     const userR = document.querySelector('#userR');
    const logincontainer = document.querySelector('.container');
         const Register = document.querySelector('.Register');
         
         const reply3 = document.querySelector('.reply3');
         const regbtn = document.querySelector('#btnR');
       regbtn.addEventListener('click', () => {
    if(userR.value.trim() === "" || passR.value.trim() === "") {
        alert("Empty fields detected, you're banned!");
    } else {
        const reginfo = {
            username: userR.value,
            password: passR.value
        };
        fetch("/reg", {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(reginfo)
        }).then(response => response.json())
          .then(data => {
          reply3.textContent = data.message;
          })
          .catch(error => {
              console.error('Problem with fetch operation:', error);
          });
    }
});