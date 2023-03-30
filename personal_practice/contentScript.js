chrome.runtime.onMessage.addListener(function (request, sender, response) {
  console.log(request);
  if (request.message == 'teal') {
    document.querySelector('body').style.backgroundColor = 'teal';
  } else if (request.message == 'normal') {
    document.querySelector('body').style.backgroundColor = 'initial';
  }
});
