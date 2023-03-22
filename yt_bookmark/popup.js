import { getCurrentTab } from './utils.js';

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarksElement, bookmark) => {
  const bookmarkTitleElement = document.createElement('div');
  const newBookmarkElement = document.createElement('div');

  const controlsElement = document.createElement('div');
  controlsElement.className = 'bookmark-controls';
  setBookmarkAttributes('play', onPlay, controlsElement);
  setBookmarkAttributes('delete', onDelete, controlsElement);

  bookmarkTitleElement.textContent = bookmark.desc;
  bookmarkTitleElement.className = 'bookmark-title';

  newBookmarkElement.id = 'bookmark-' + bookmark.time;
  newBookmarkElement.className = 'bookmark';

  newBookmarkElement.setAttribute('timestamp', bookmark.time);

  newBookmarkElement.appendChild(bookmarkTitleElement);
  newBookmarkElement.appendChild(controlsElement);
  bookmarksElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmark = []) => {
  const bookmarkElement = document.getElementById('bookmarks');
  bookmarkElement.innerHTML = '';

  if (currentBookmark.length > 0) {
    for (let i = 0; i < currentBookmark.length; i++) {
      const bookmark = currentBookmark[i];
      addNewBookmark(bookmarkElement, bookmark);
    }
  } else {
    bookmarkElement.innerHTML = '<i>No bookmarks to show</i>';
  }
};

const onPlay = async (e) => {
  const bookmarkTimestamp =
    e.target.parentNode.parentNode.getAttribute('timestamp');
  const activeTab = await getCurrentTab();

  chrome.tabs.sendMessage(activeTab.id, {
    type: 'PLAY',
    value: bookmarkTimestamp,
  });
};

const onDelete = async (e) => {
  const bookmarkTiestamp =
    e.target.parentNode.parentNode.getAttribute('timestamp');
  const activeTab = await getCurrentTab();

  const bookmarkedElementToDelete = document.getElementById(
    'bookmark-' + bookmarkTiestamp
  );

  bookmarkedElementToDelete.parentNode.removeChild(bookmarkedElementToDelete);

  chrome.tabs.sendMessage(
    activeTab.id,
    {
      type: 'DELETE',
      value: bookmarkTiestamp,
    },
    viewBookmarks
  );
};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement('img');
  controlElement.src = `assets/${src}.png`;

  controlElement.title = src;
  controlElement.addEventListener('click', eventListener);
  controlParentElement.appendChild(controlElement);
};

document.addEventListener('DOMContentLoaded', async () => {
  const activeTab = await getCurrentTab();
  const queryParameters = activeTab.url.split('?')[1];
  const urlParameter = new URLSearchParams(queryParameters);

  const currentVideo = urlParameter.get('v');

  if (activeTab.url.includes('youtube.com/watch') && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];

      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName('container')[0];
    container.innerHTML = "<div class='title'>Not a youtube page<div>";
  }
});
