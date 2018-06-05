console.log('Start background.js');

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (~tab.url.indexOf('github.com')) {
    chrome.pageAction.show(tabId);
  }
});
// 定期実行
chrome.alarms.create({delayInMinutes: 3}); // 起動時だけは、3分で実行する
// chrome.alarms.create({delayInMinutes: 0.1}); // This is for debugging
chrome.alarms.onAlarm.addListener(function() {
  console.log('do!');
  GRStorage.pullRequests().then(function(pullRequests) {
    // closed なPRの削除
    GRStorage.savePullRequests(pullRequests.filter(function(pr) {
      return !pr.isClosed();
    }));

    // PRのアップデートの確認
    pullRequests.forEach(function(pr) {
      Github.getPullRequest(pr).then(function(data) {
        if (PullRequest.isClosed(data)) {
          pr.close();
          GRStorage.savePullRequests(pullRequests);
        } else {
          // console.log(data);
          pr.compare(data).then(function(result) {
            if (result) {
              console.log('updated');
              pr.updated();
              GRStorage.savePullRequests(pullRequests);
            } else {
              console.log('not updated');
            }
          });
        }
      });
    });
  });
  chrome.alarms.create({delayInMinutes: 60});
  // chrome.alarms.create({delayInMinutes: 0.1}); // This is for debugging
});

