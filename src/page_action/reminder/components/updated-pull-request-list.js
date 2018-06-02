function UpdatedPullRequestListComponent() {}
UpdatedPullRequestListComponent.render = function() {
  GRStorage.pullRequests().then(function(pullRequests){
    // console.log(pullRequests);
    var updatedPullRequestComponents = pullRequests.filter(function(pr) {
      return pr.isUpdated();
    }).map(function(pr) {
      return new UpdatedPullRequestComponent(pr);
    });
    var htmlText = updatedPullRequestComponents.map(function(comp) {
      return comp.render();
    }).join('');

    if (updatedPullRequestComponents.length > 0) {
      document.getElementById('updated-pr-list-container').innerHTML = htmlText;
      updatedPullRequestComponents.forEach(function(comp) {
        comp.setupEvents();
      })
    } else {
      document.getElementById('empty-message').style.display = 'block';
    }
  });
};
