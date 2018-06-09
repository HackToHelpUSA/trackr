function init() {
  // Get a reference to the database service
  var database = firebase.database().ref('/teams');

  // Element to store team info
  var teams = [];
  var scores = [];

  /*database.once('value').then((snapshot) => {
    for (var team in snapshot.val()) {
      teams.push(snapshot.val()[team].name);
      scores.push(snapshot.val()[team].points);
    }
    makeTeamDivs(teams);
    updateScores(scores);
  });*/

  database.on('value', (snapshot) => {
    var scores = [];
    for (var team in snapshot.val()) {
      teams.push(snapshot.val()[team].name);
      scores.push(snapshot.val()[team].points);
    }
    makeTeamDivs(teams);
    updateScores(scores);
  });
}

function makeTeamDivs(teams) {
  var row = document.getElementsByClassName('row')[0];

  while (row.firstChild) {
    row.removeChild(row.firstChild);
  }

  for (team_index in teams) {
    var team_div = document.createElement('div');
    var team_name = document.createElement('div');

    team_div.classList.add('col-4', 'team-div', 'text-center', teams[team_index].toLowerCase(), 'd-flex', 'flex-column-reverse');
    team_div.id = teams[team_index].toLowerCase();

    team_name.classList.add('name');
    team_name.innerHTML = teams[team_index];

    team_div.appendChild(team_name);
    row.appendChild(team_div);
  }
}

function updateScores(scores) {
  var row = document.getElementsByClassName('row')[0];
  var counter = 0;

  for (var j = 0; j < row.children.length; j++) {
    var score_text = row.children[j].getElementsByClassName('score-text');

    for (var i = 0; i < score_text.length; i++) {
      // Delete score text from DOM
      score_text[i] != undefined ? score_text[i].parentElement.removeChild(score_text[i]) : null;
    }

    var score = scores[counter] - ((row.children[j].children.length - 1) * 5);

    var scores_num = document.createElement('div');
    scores_num.classList.add('text-center', 'score-text', 'score');
    scores_num.innerHTML = scores[counter] + ' pts';

    for (var i = 0; i < score; i++) {
      if (i % 5 === 0) {
        var score_div = document.createElement('div');
        score_div.classList.add('score');
        row.children[j].appendChild(score_div);
      }
    }

    var placeholder_divs = row.children[j].getElementsByClassName('placeholder');
    for (var i = 0; i < placeholder_divs.length; i++) { // Remove every single placeholder
      placeholder_divs[i].parentElement.remove(placeholder_divs[i]);
    }

    var placeholders = 1000 - score;
    for (var i = 0; i < placeholders; i++) { // Add placeholders
      if (i % 5 === 0) {
        var placeholder_div = document.createElement('div');
        placeholder_div.classList.add('score', 'placeholder');
        row.children[j].appendChild(placeholder_div);
      }
    }
    row.children[j].appendChild(scores_num);
    counter++;
  }
}

window.onload = function() {
  var config = {
    apiKey: "AIzaSyCsQ3NYtiypRmOQ0jKWfaednap84q9w1hQ",
    authDomain: "trakr-f866c.firebaseapp.com",
    databaseURL: "https://trakr-f866c.firebaseio.com/",
    projectId: "trakr-f866c",
    storageBucket: "trakr-f866c.appspot.com",
    messagingSenderId: "379765534906"
  };
  firebase.initializeApp(config);
  init();
};