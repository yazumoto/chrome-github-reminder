function GRStorage() {}
GRStorage.githubToken = function() {
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(['githubToken'], function (result) {
      resolve(result.githubToken);
    })
  });
};
GRStorage.findPullRequestFromUrl = function(url) {
  return GRStorage.pullRequests()
    .then(function(pullRequests) {
      return pullRequests.find(function(pr) {
        return pr.url === url;
      });
    });
};
GRStorage.pullRequests = function() {
  return new Promise(function(resolve, reject) {
    chrome.storage.sync.get(['pullRequests'], function(result){
      resolve(result.pullRequests.map(function(pr) {
        return new PullRequest(pr);
      }));
    });
  });
};

GRStorage.savePullRequests = function(pullRequests) {
  chrome.storage.sync.set({ pullRequests: pullRequests });
};
GRStorage.addNewPullRequest = function(newPr) {
  chrome.storage.sync.get(['pullRequests'], function(result){
    var pullRequests = result.pullRequests || [];
    var sameOne = pullRequests.find(function(pr) {
      return pr.url === newPr.url;
    });
    if (!sameOne) {
      pullRequests.push(newPr);
      chrome.storage.sync.set({pullRequests: pullRequests}, function (result) {
        // console.log(pullRequests);
        console.log('addNewPullRequest');
      });
    } else {
      console.log('you already have same one.');
    }
  });
};
