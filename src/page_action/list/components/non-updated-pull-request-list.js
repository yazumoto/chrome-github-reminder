function NonUpdatedPullRequestListComponent() {}
NonUpdatedPullRequestListComponent.render = function() {
  GRStorage.pullRequests().then(function(pullRequests){
    // console.log(pullRequests);
    var nonUpdatedPullRequestComponents = pullRequests.filter(function(pr) {
      return !pr.isUpdated();
    }).map(function(pr) {
      return new NonUpdatedPullRequestComponent(pr);
    });
    var htmlText = nonUpdatedPullRequestComponents.map(function(comp) {
      return comp.render();
    }).join('');

    if (nonUpdatedPullRequestComponents.length > 0) {
      document.getElementById('pr-list-container').innerHTML = htmlText;
      nonUpdatedPullRequestComponents.forEach(function(comp) {
        comp.setupEvents();
      })
    } else {
      document.getElementById('empty-message').style.display = 'block';
    }
  });
};
