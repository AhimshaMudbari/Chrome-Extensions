let color = 'tomato';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: color });
});

//In manifest json "option_page":"opt.html" --> by whichwe can create the option page which will be open if clicked in option.
