var bg_btn = document.querySelector('#change_bg');
var bg_btn2 = document.querySelector('#normal');
bg_btn.addEventListener('click', async function (e) {
  e.preventDefault();

  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  chrome.tabs.sendMessage(tab.id, { message: 'teal' });
});

bg_btn2.addEventListener('click', async function (e) {
  e.preventDefault();

  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  chrome.tabs.sendMessage(tab.id, { message: 'normal' });
});
