var randomNumberAnswer;

function start() {
  // Change Start and Stop Button Colors
  document
    .getElementById('btnStart')
    .setAttribute('class', 'startBtn inactiveStart');

  document
    .getElementById('btnStop')
    .setAttribute('class', 'stopBtn activeStop');

  document.getElementById('btnStart').disabled = true;

  // Genereate Two Random Numbers and show it in question tag
  var rdOne = Math.floor(Math.random() * 11);
  var rdTwo = Math.floor(Math.random() * 11);
  var randomString = rdOne + ' + ' + rdTwo;
  randomNumberAnswer = rdOne + rdTwo;

  document.getElementById('q1').innerText = randomString;

  // Answer Input
  document.getElementById('answerBox').disabled = false;

  //   Check Answer Button
  document.getElementById('userResult').disabled = false;
}

function checkAnswer() {
  //   Get the user input
  var userAnswer = parseInt(document.getElementById('answerBox').value);
  var userAnswerList = '';

  if (userAnswer === randomNumberAnswer) {
    userAnswerList = '<li>Correct</li>';
  } else {
    userAnswerList = '<li>Wrong</li>';
  }

  document.getElementById('answerBox').value = '';
  document.getElementById('list').innerHTML += userAnswerList;

  start();
}

function stop() {
  document
    .getElementById('btnStart')
    .setAttribute('class', 'startBtn activeStart');

  document
    .getElementById('btnStop')
    .setAttribute('class', 'stopBtn inactiveStop');

  document.getElementById('btnStart').disabled = false;
  document.getElementById('btnStop').disble = true;
  document.getElementById('answerBox').disabled = true;
  document.getElementById('q1').innerText = '';
  document.getElementById('userResult').disabled = true;
  document.getElementById('list').innerText = '';
}
