document.addEventListener("DOMContentLoaded", function (event) {
  console.log("reminder DOM loaded");

  var currentTabUrl;

  // Pull Request のページなら、ページ保存機能を表示
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    //'tabs' will be an array with only one element: an Object describing the active tab
    //  in the current window.
    currentTabUrl = tabs[0].url;

    var match = currentTabUrl.match(/^https\:\/\/github\.com\/.*\/pull\/(?<number>\d+)(|\/.*)/);
    if (match) {
      var prUrl = new PullRequest({ url: currentTabUrl }).url;
      GRStorage.findPullRequestFromUrl(prUrl)
        .then(function(pr) {
          // まだ保存していないときのみ、保存ボタンを表示する
          if (!pr) {
            document.getElementById('save-button').style.display = 'block';
          }
        });
    }
  });

  // Reminders
  document.getElementById('save-button').addEventListener('click', function(ev) {
    PullRequest.get(currentTabUrl).then(function(pr) {
      GRStorage.addNewPullRequest(pr);
      document.getElementById('save-button').style.display = 'none';
      document.getElementById('saved-message').style.display = 'block';
    });
  });

  // アップデートのあるPRを表示する
  UpdatedPullRequestListComponent.render();
});
