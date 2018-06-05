document.addEventListener("DOMContentLoaded", function (event) {
  var form = document.forms.namedItem("form");
  form.addEventListener('submit', function (ev) {
    var data = new FormData(form);
    var token = form.elements['token'].value;

    ev.preventDefault();
    document.getElementById('error').style.display = 'none';

    var fetchData = {
      method: 'GET',
      body: data,
      headers: new Headers()
    };
    fetch('https://api.github.com/issues?access_token=' + token)
      .then(function (response) {
        if (response.status == 200) {
          console.log('success!');
          chrome.storage.sync.set({githubToken: token}, function () {
            console.log('Value is set to ' + token);
            document.location.href = '../reminder/reminder.html';
          });
        } else {
          console.log('failed');
          document.getElementById('error').style.display = 'block';
        }
      });
  });
});

