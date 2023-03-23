const btn_color = document.querySelector('.btn_color');
const selected_color = document.querySelector('.selected_color');
const color_grid = document.querySelector('.color_grid');
const color_value = document.querySelector('.color_value');

btn_color.addEventListener('click', async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  //This is used to execute the extension code in the browser or in the DOM of any webpages
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },

      func: pickcolor,
    },
    async (injectionResult) => {
      const [data] = injectionResult;
      await chrome.storage.sync.get('color', ({ color }) => {
        console.log('color:', color);
      });
      const color = data?.result?.sRGBHex;
      color_grid.style.backgroundColor = color ? color : 'teal';
      color_value.innerHTML = color ? color : '<i>No value</i>';

      //using navigator API to copy text in our clipboard
      try {
        await navigator.clipboard.writeText(color);
      } catch (err) {
        console.error(err);
      }
    }
  );
});

async function pickcolor() {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    // console.log(selectedColor);
  } catch (err) {
    console.error(err);
  }
}
