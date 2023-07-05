/**
 * Global DOM variables
 */
var score = document.getElementById('score');
var time = document.getElementById('time');

var startBtn = document.getElementById('startBtn');
var stopBtn = document.getElementById('stopBtn');

var question = document.getElementById('question');
var answer = 0;

var AnsBtn1 = document.getElementById('btnOne');
var AnsBtn2 = document.getElementById('btnTwo');
var AnsBtn3 = document.getElementById('btnThree');

/**
 * GameStart Function
 */
function gameStart() {
  startBtn.setAttribute('class', 'startGameBtn inactiveStart');
  startBtn.disabled = true;

  stopBtn.setAttribute('class', 'stopGameBtn activeStop');
  stopBtn.disabled = false;

  AnsBtn1.setAttribute('class', 'firstBtn activeAnswerButton');
  AnsBtn1.disabled = false;

  AnsBtn2.setAttribute('class', 'secondBtn activeAnswerButton');
  AnsBtn2.disabled = false;

  AnsBtn3.setAttribute('class', 'thirdBtn activeAnswerButton');
  AnsBtn3.disabled = false;

  quizzz();
}

/**
 * Main Logic Section of this game
 * Quiz
 */
function quizzz() {
  var rd1 = Math.floor(Math.random() * 101);
  var rd2 = Math.floor(Math.random() * 101);

  var rd3 = Math.floor(Math.random() * 101);
  var rd4 = Math.floor(Math.random() * 101);
  var rd5 = Math.floor(Math.random() * 101);

  var rdBtn = Math.floor(Math.random() * 4);

  // set the question
  question.innerText = rd1 + ' + ' + rd2 + ' = ';

  // calculate the real answer
  answer = rd1 + rd2;

  // Set the random  on the buttons
  AnsBtn1.innerText = rd3;
  AnsBtn2.innerText = rd4;
  AnsBtn3.innerText = rd5;

  // Depending on the value of rdBtn, set the real answer accordingly
  if (rdBtn === 1) {
    AnsBtn1.innerText = answer;
  } else if (rdBtn === 2) {
    AnsBtn2.innerText = answer;
  } else {
    AnsBtn3.innerText = answer;
  }
}

/**
 * Check Answers
 */
function checkAnswer(buttonNumber) {
  var btn;
  if (buttonNumber == 1) btn = AnsBtn1;
  if (buttonNumber == 2) btn = AnsBtn2;
  if (buttonNumber == 3) btn = AnsBtn3;

  if (btn.innerText == answer) {
    score.innerText = Number(score.innerText) + 10;
  } else {
    score.innerText = Number(score.innerText) - 10;
  }
  time.innerText = Number(time.innerText) + 1;
  quizzz();
}

/**
 * Stop the game
 */
function gameStop() {
  startBtn.setAttribute('class', 'startGameBtn activeStart');
  startBtn.disabled = false;

  stopBtn.setAttribute('class', 'stopGameBtn inactiveStop');
  stopBtn.disabled = true;

  AnsBtn1.setAttribute('class', 'firstBtn inactiveAnswerButton');
  AnsBtn1.disabled = true;

  AnsBtn2.setAttribute('class', 'secondBtn inactiveAnswerButton');
  AnsBtn2.disabled = true;

  AnsBtn3.setAttribute('class', 'thirdBtn inactiveAnswerButton');
  AnsBtn3.disabled = true;

  question.innerText = '';
  AnsBtn1.innerText = '';
  AnsBtn2.innerText = '';
  AnsBtn3.innerText = '';

  document.getElementById('list').innerHTML =
    '<li>Your Score is ' + score.innerText + '</li>';
}
