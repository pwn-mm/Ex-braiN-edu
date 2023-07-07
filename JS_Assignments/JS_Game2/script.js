/**
 * Declare Global DOM variables
 */
var score = document.getElementById('score');
var time = document.getElementById('time');

var startBtn = document.getElementById('startBtn');
var stopBtn = document.getElementById('stopBtn');

var operatorSelect = document.getElementById('operator');
var question = document.getElementById('question');
var answer = 0;

var AnsBtn1 = document.getElementById('btnOne');
var AnsBtn2 = document.getElementById('btnTwo');
var AnsBtn3 = document.getElementById('btnThree');

/**
 * Global Random Generator Function
 */

function generateRandomNumbers() {
  return Math.floor(Math.random() * 101);
}

/**
 * GameStart Function
 */
function gameStart() {
  startBtn.setAttribute('class', 'startGameBtn inactiveStart');
  startBtn.disabled = true;

  stopBtn.setAttribute('class', 'stopGameBtn activeStop');
  stopBtn.disabled = false;

  operatorSelect.hidden = false;

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
 *
 * First, generate 2 random numbers for the question
 * Second, generate a radom number between 1 to 3, to shuffle buttons
 * Third, get the value of selectedOption
 * Fouth, depends on the selected value, each question is different
 * Finally, depends on random number for the button, shuffle the answers between 3 buttons
 */
function quizzz() {
  var rd1 = generateRandomNumbers();
  var rd2 = generateRandomNumbers();

  var rd3 = generateRandomNumbers();
  var rd4 = generateRandomNumbers();
  var rd5 = generateRandomNumbers();

  var rdBtn = Math.floor(Math.random() * 4);

  // select the operator
  var selectedOperator = operatorSelect.value;

  // set the question and answers
  if (selectedOperator === '+') {
    question.innerText = rd1 + ' + ' + rd2 + ' = ';
    answer = rd1 + rd2;
  } else if (selectedOperator === '-') {
    question.innerText = rd1 + ' - ' + rd2 + ' = ';
    answer = rd1 - rd2;
  } else if (selectedOperator === '*') {
    question.innerText = rd1 + ' x ' + rd2 + ' = ';
    answer = Math.floor(rd1 * rd2);
  } else if (selectedOperator === '/') {
    question.innerText = rd1 + ' ÷ ' + rd2 + ' = ';
    answer = Math.floor(rd1 / rd2);
  }

  // Set the random numbers on the buttons
  AnsBtn1.innerText = rd3;
  AnsBtn2.innerText = rd4;
  AnsBtn3.innerText = rd5;

  // Depending on the value of rdBtn, set the real answer randomly
  if (rdBtn === 1) {
    AnsBtn1.innerText = answer;
  } else if (rdBtn === 2) {
    AnsBtn2.innerText = answer;
  } else {
    AnsBtn3.innerText = answer;
  }
}

/**
 * Check Answers Function
 *
 * @param {number} buttonNumber - The number of the answer button (1 or 2 or 3) that the user was clicked
 * To check the selected answer.
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
 *
 * Reset all buttons styles
 * Clear all texts
 * Show the total points scored by the user
 */
function gameStop() {
  startBtn.setAttribute('class', 'startGameBtn activeStart');
  startBtn.disabled = false;

  stopBtn.setAttribute('class', 'stopGameBtn inactiveStop');
  stopBtn.disabled = true;

  operatorSelect.hidden = true;

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
