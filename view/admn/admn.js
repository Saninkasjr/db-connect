const readonly = document.querySelector('#readonly')
const Create = document.querySelector('#createBtn')
const read = document.querySelector('.read')
const createDiv = document.querySelector('.createC')
const contain = document.querySelector('.data-Container')
const createContainer = document.querySelector('.createResponse')

const btnArray = [Create, readonly];

btnArray.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove 'active' class from buttons that were not clicked
    btnArray.forEach(button => {
      if (button !== btn) {
        button.classList.remove('active');
      }
    });
  });
});
function anim(ele, parentEl, butn) {
  ele.style.opacity = 1
  parentEl.innerHTML = ''
  setTimeout(function () {
    ele.style.display = "block";
  }, 200)
  butn.classList.toggle('active')


}
async function createC() {
  const usrname = document.querySelector('#username')
  const userpasswd = document.querySelector('#password')

  const userMsg = document.querySelector('#userMsg')
  const userMsgId = document.querySelector('#UserMsgId')


  const createuserbtn = document.querySelector('#createbtn')
  const createMsgbtn = document.querySelector('#Msgbtn')

  const showuserUi = document.querySelector('#showCreateUi')
  const showMsgUi = document.querySelector('#showMsgUi')
  const CreateUi = document.querySelector('.create-userDiv')
  const CreateMsgUi = document.querySelector('.create-userMsg')

  showuserUi.addEventListener("click", () => {
    if (CreateUi.style.display === 'block') {
      CreateUi.style.display = 'none'
    } else {
      CreateUi.style.display = 'block'
    }

  })
  showMsgUi.addEventListener("click", () => {
    if (CreateMsgUi.style.display === 'block') {
      CreateMsgUi.style.display = 'none'
    } else {
      CreateMsgUi.style.display = 'block'
    }

  })
  createuserbtn.addEventListener("click", () => {
    if (!usrname || usrname.value.trim() === '' || !userpasswd || userpasswd.value.trim() === '') {
      usrname.placeholder = 'no username entered'
      userpasswd.placeholder = 'no password entered'
      console.log('errors erors')
    } else {
      alert('passed')
      console.log('success')
      const userObj = {
        username: usrname.value,
        password: userpasswd.value
      }
      alert(`${userObj.username} ${userObj.password}`) 
      async function createUser() {
        const response = await fetch('/reg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userObj)
      })
      }
      
      usrname.value = ''
      userpasswd.value = ''
      userpasswd.style.borderColor = 'white'

    }
  })
  createMsgbtn.addEventListener("click", () => {
    if (!userMsg || userMsg.value.trim() === '' || !userMsgId || userMsgId.value.trim() === '') {
      userMsg.placeholder = 'no username entered'
      userMsgId.placeholder = 'no password entered'
      console.log('errors erors')
    } else {
      console.log('success')
      const UsermsgObj = {
        Mesg: userMsg.value,
        name: userMsgId.value
      }
      async function appendMsg() {
        function success(data) {
          const ele = document.createElement('p')
          ele.textContent = data.message
          ele.classList.add('ele')
          createContainer.appendChild(ele)
          console.log(data.message)
        }
        const response = await fetch('/MSG', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(UsermsgObj)
        }).then(response => response.json()).then(data => success(data))

      }
      appendMsg()
      userMsg.value = ''
      userMsgId.value = ''
      userpasswd.style.borderColor = 'white'

    }
  })
  function showCreate() {
    if (createDiv.style.display !== 'block') {
      createDiv.style.display = 'block'
      Create.classList.add('active')
    } else {
      createDiv.style.display = 'none'
      Create.classList.remove('active')
    }
  }
  Create.addEventListener('click', showCreate)

}
function CrudR() {
  const btnM = document.querySelector('#btnM').addEventListener('click', () => {
    contain.innerHTML = ''

    fetch('/message', {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const MsgDiv = document.querySelector('.MsgDiv');

        data.forEach(item => {
          const { name, message } = item
          const messageEl = document.createElement('p');
          messageEl.textContent = `${name} : ${message}`
          messageEl.classList.add('parentEl')
          contain.appendChild(messageEl)
        })
      })

  })
  const btn = document.querySelector('#btn').addEventListener("click", () => {

    // anim(read, contain, readonly)
    if (contain.length === 0) {
      alert('something init')
    } else {
      const input = document.querySelector('#input')

      const userinfo = {
        userquery: input.value
      }
      contain.innerHTML = ''
      fetch('/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userinfo)
      }).then(response => response.json()).then(users => {
        users.forEach(user => {

          const { user_id, username, password } = user
          console.log(`id: ${user_id} username: ${username} password: ${password}`)

          const idEl = document.createElement('p')
          const userEl = document.createElement('p')
          const passEl = document.createElement('p')
          const parentEl = document.createElement('div')

          idEl.textContent = `${user_id}`
          userEl.textContent = `${username}`
          passEl.textContent = `${password}`

          parentEl.classList.add('parentEl')
          passEl.classList.add('passEl')
          userEl.classList.add('userEl')
          idEl.classList.add('idEl')

          parentEl.textContent = `{id: ${idEl.textContent} } { username: ${userEl.textContent} { password: ${passEl.textContent} }`
          contain.appendChild(parentEl)
        })
        console.log(users)

      })

    }


  })
  function readOnly() {
    if (read.style.display === 'block') {
      read.style.display = 'none'
      readonly.classList.remove('active')
    } else {
      anim(read, contain, readonly)

    }
  }
  readonly.addEventListener('click', readOnly)
}
window.onload = () => {
  CrudR()
  createC()
}