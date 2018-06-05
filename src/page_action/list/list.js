document.addEventListener("DOMContentLoaded", function (event) {
  console.log("reminder DOM loaded");

  var currentTabUrl;

  // アップデートのあるPRを表示する
  NonUpdatedPullRequestListComponent.render();

  // Links
  document.getElementById('reminder-list').addEventListener('click', function() {
    document.location.href = '../reminder/reminder.html';
  });

});
