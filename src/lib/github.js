function Github() {
}
Github.checkIssue = function () {
  return Github.get('issues');
};
// pullRequest : PullRequest in pull-request.js
Github.getPullRequest = function(pullRequest) {
  var path = 'repos/' + pullRequest.owner + '/' + pullRequest.repo + '/pulls/' + pullRequest.number;
  return Github.get(path);
};

// Private
Github.get = function(path, params) {
  return Github.request('GET', path, { params: params });
};
Github.post = function(path, data) {
  return Github.request('POST', path, { data: data });
};
Github.request = function(method, path, option){
  option = option || {};

  return new Promise(function (resolve, reject) {
    GRStorage.githubToken()
      .then(function (token) {
        var fetchData = {
          method: method,
          headers: new Headers()
        };
        if (option['data']) {
          fetchData['data'] = option['data'];
        }
        var paramsWithAccessKey = Object.assign({ access_token: token }, option['params']);
        var paramsString = Object.keys(paramsWithAccessKey).map(function(key) {
          return key + '='+ paramsWithAccessKey[key];
        }).join('&');
        fetch('https://api.github.com/'+path+'?'+paramsString)
          .then(function(response) {
            if (response.status === 200 || response.status === 201) {
              response.json().then(function(data) {
                resolve(data);
            });
            } else {
              reject(response);
            }
          });
      });
  });
};
