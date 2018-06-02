// Status
// read -> updated -> read
function PullRequest(object) {
  this.title = object.title;
  this.url = object.url;
  this.status = object.status || 'read';
  this.commits = object.commits || 0;
  this.comments = object.comments || 0;
  this.reviewComments = object.reviewComments || 0;

  var regx = this.url.match(/^https\:\/\/github\.com\/(?<owner>[^\/]*)\/(?<repo>[^\/]*)\/pull\/(?<number>\d*)(|\/.*)/);
  this.owner = regx.groups['owner'];
  this.repo = regx.groups['repo'];
  this.number = regx.groups['number'];
  this.url = 'https://github.com/'+this.owner+'/'+this.repo+'/pull/' + this.number;
}

// Instance Methods
PullRequest.prototype.read = function () {
  this.status = 'read';
};
PullRequest.prototype.updated = function () {
  this.status = 'updated';
};
PullRequest.prototype.isUpdated = function () {
  return this.status === 'updated';
};
PullRequest.prototype.compare = function (prFromGithub) {
  return new Promise(function (resolve, reject) {
    if (prFromGithub.commits > this.commits || prFromGithub.comments > this.comments || prFromGithub.review_comments > this.reviewComments) {
      this.commits = prFromGithub.commits;
      this.comments = prFromGithub.comments;
      this.reviewComments = prFromGithub.review_comments;
      resolve(true);
    } else {
      resolve(false);
    }
  }.bind(this));
};

// Static Methods
PullRequest.get = function (url) {
  return Github.getPullRequest(new PullRequest({url: url}))
    .then(function (data) {
      return new PullRequest({
        title: data.title,
        url: url,
        commits: data.commits,
        comments: data.comments,
        reviewComments: data.review_comments
      });
    });
};
