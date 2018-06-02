document.addEventListener("DOMContentLoaded", function (event) {
  chrome.storage.sync.get(['githubToken'], function (result) {
    if (result.githubToken) {
      document.location.href = '../reminder/reminder.html';
    } else {
      document.location.href = '../receive-token/receive-token.html';
    }
  });
});
