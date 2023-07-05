var btnStart = document.getElementById('btnStart');
var btnStop = document.getElementById('btnStop');
var leftBtn = document.getElementById('leftBtn');
var rightBtn = document.getElementById('rightBtn');
var score = document.getElementById('score');
var time = document.getElementById('time');
var result = 0;

function startGame() {
  btnStart.setAttribute('class', 'inactiveStart  btnHeader');
  btnStart.disabled = true;

  btnStop.setAttribute('class', 'btnFooter activeStop');
  btnStop.disabled = false;

  leftBtn.setAttribute('class', 'btn1 activeBtn');
  rightBtn.setAttribute('class', 'btn2 activeBtn');

  leftBtn.disabled = false;
  rightBtn.disabled = false;

  quiz();
}

function gameStop() {
  btnStop.setAttribute('class', 'btnFooter inactiveStop');
  btnStop.disabled = true;

  btnStart.disabled = false;
  btnStart.setAttribute('class', 'btnHeader');

  leftBtn.innerText = '';
  rightBtn.innerText = '';

  leftBtn.setAttribute('class', 'btn1 inactiveLeftBtn');
  rightBtn.setAttribute('class', 'btn1 inactiveRightBtn');

  leftBtn.disabled = true;
  rightBtn.disabled = true;

  document.getElementById('list').innerHTML =
    '<li>Your Score is' + score.innerText + '</li>';
}

function quiz() {
  var leftNumber = Math.floor(Math.random() * 101);
  var rightNumber = Math.floor(Math.random() * 101);

  leftBtn.innerText = leftNumber;
  rightBtn.innerText = rightNumber;

  if (leftNumber > rightNumber) {
    result = leftNumber;
  } else if (rightNumber > leftNumber) {
    result = rightNumber;
  } else {
    quiz();
  }
}

function checkButtons(buttonType) {
  var btn = buttonType == 1 ? leftBtn : rightBtn;

  if (btn.innerText == result) {
    score.innerText = Number(score.innerText) + 10;
  } else {
    score.innerText = Number(score.innerText) - 10;
  }
  time.innerText = Number(time.innerText) + 1;
  quiz();
}
