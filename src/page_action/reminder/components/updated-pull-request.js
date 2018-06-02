function UpdatedPullRequestComponent(pullRequest) {
  this.pullRequest = pullRequest;
}
UpdatedPullRequestComponent.prototype.render = function () {
  return '<div class="updated-pull-request" id="'+this.pullRequest.url+'" >' + this.pullRequest.title + '</div>';
};
UpdatedPullRequestComponent.prototype.setupEvents = function(){
  document.getElementById(this.pullRequest.url).addEventListener('click', function(){
    GRStorage.pullRequests().then(function(prs) {
      GRStorage.savePullRequests(prs.map(function(pr) {
        if (pr.url === this.pullRequest.url) {
          pr.read();
        }
        return pr;
      }.bind(this)));

      chrome.tabs.create({
        url: this.pullRequest.url,
        // active: false
      });
    }.bind(this));
  }.bind(this));
};
