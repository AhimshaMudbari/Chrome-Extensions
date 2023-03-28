document.querySelector('.run-command').addEventListener('click', function () {
  createCommandObj();
});

function createCommandObj() {
  var commands = document.querySelectorAll('.commands-list .command-item    ');
  var commandsArr = [];
  for (let index = 0; index < commands.length; index++) {
    var itemsObj = {};
    itemsObj.type = commands[index].querySelector('select').value;
    itemsObj.one = commands[index].querySelector('.value-1').value;
    itemsObj.two = commands[index].querySelector('.value-2').value;
    commandsArr.push(itemsObj);
  }
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    var obj = commandsArr;
    chrome.tabs.sendMessage(activeTab.id, {
      command: 'runCommands',
      data: obj,
    });
  });
}

document.querySelector('.new-command').addEventListener('click', function () {
  var newItem = `       <div class="command-item">
  <select>
    <option value="wait">Wait</option>
    <option value="click">Click</option>
    <option value="enter">Enter</option>
    <option value="save">Save value</option>
  </select>

  <input class="value-1" placeholder="200m/s" />
  <input class="value-2" placeholder="optional" /> 
  </div>  `;

  document.querySelector('.commands-list').innerHTML += newItem;
});

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  var obj = {};

  chrome.tabs.sendMessage(activeTab.id, { command: 'runCommands', data: obj });
});
