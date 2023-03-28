chrome.runtime.addListener((msg, sender, response) => {
  if (msg.command == 'runCommands') {
    var scrapObj = msg.data;
    console.log(scrapObj);
  }
});
