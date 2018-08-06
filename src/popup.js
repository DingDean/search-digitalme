let input = document.getElementById('apiKey')
let submit = document.getElementById('submit')
let info = document.getElementById('info')

function isLogin (callback) {
  chrome.runtime.sendMessage({event: 'isLogin'}, callback)
}

function promptForLogin () {
  info.innerHTML = 'Please login:'
  submit.style.display = 'block'
  input.style.display = 'block'
}

function disableLogin () {
  info.innerHTML = "You've logged in."
  submit.style.display = 'none'
  input.style.display = 'none'
}

(function () {
  isLogin(function (info) {
    if (info.isLogin)
      disableLogin()
    else
      promptForLogin()
  })
})()

submit.addEventListener('click', function (e) {
  e.preventDefault()
  if (input.value === '')
    return console.log('wrong input')

  fetch('YOUR_HOST/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({apiToken: input.value})
  }).then((res) => {
    info.innerHTML = 'Login Success'
    res.json()
      .then(js => {
        chrome.runtime.sendMessage({event: 'setToken', token: js.token})
      }).catch(e => console.error(e))
  }).catch(e => {
    info.innerHtml = 'Login Failed'
    console.error(e)
  })
})
