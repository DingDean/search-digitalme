let token = null

function callForLogin () {
  chrome
    .browserAction
    .setBadgeText({text: ' L '})

  chrome
    .browserAction
    .setBadgeBackgroundColor({color:'#f57f17'})
}
callForLogin()

function showError () {
  chrome
    .browserAction
    .setBadgeText({text: ' X '})

  chrome
    .browserAction
    .setBadgeBackgroundColor({color:'#FF0000'})
}

function showSuccess () {
  chrome
    .browserAction
    .setBadgeText({text: ''})
}

function isMyOwnAction (req) {
  return req.type === 'main_frame'
}

chrome.webRequest.onBeforeRequest.addListener(
  function (req) {
    if (!isMyOwnAction(req))
      return
    if (!token) {
      console.log('unauthorized')
      return callForLogin()
    }

    fetch('YOUR_HOST/api/save', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    }).then(res => {
      if (res.status === 401) {
        token = null
        return callForLogin()
      }
    }).catch(e => {
      console.log('Failed to initiate request')
      console.error(e)
    })
  },
  {urls: [
    "*://*.google.com/*",
    "*://*.baidu.com/*",
    "*://*.bing.com/*",
  ]}
)

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.event === "setToken") {
      token = request.token
      showSuccess()
      sendResponse({ok: true})
    } else if (request.event === "isLogin") {
      sendResponse({ok: true, isLogin: token !== null})
    }
  })
