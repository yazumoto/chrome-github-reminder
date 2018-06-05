function NonUpdatedPullRequestComponent(pullRequest) {
  this.pullRequest = pullRequest;
}
NonUpdatedPullRequestComponent.prototype.render = function () {
  return '<div class="pull-request" id="'+this.pullRequest.url+'" >' + this.pullRequest.title + '</div>';
};
NonUpdatedPullRequestComponent.prototype.setupEvents = function(){
  document.getElementById(this.pullRequest.url).addEventListener('click', function(){
    chrome.tabs.create({
      url: this.pullRequest.url,
      // active: false
    });
  }.bind(this));
};
