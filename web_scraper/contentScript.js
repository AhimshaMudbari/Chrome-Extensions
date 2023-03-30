console.log('chalirako cha');
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.command == 'runCommands') {
    var scrapObj = msg.data;
    console.log(scrapObj);
  }
});
