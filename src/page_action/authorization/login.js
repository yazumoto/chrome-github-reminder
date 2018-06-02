document.addEventListener("DOMContentLoaded", function (event) {
  var form = document.forms.namedItem("form");
  form.addEventListener('submit', function(ev) {
    var data = new FormData(form);
    var email = form.elements['email'];
    var password = form.elements['password'];

    data.append('email', email);
    data.append('password', email);

    var request = new XMLHttpRequest();
    request.open("POST", "http://foo.com/submitform.php");
    request.send(formData);
  });
});

