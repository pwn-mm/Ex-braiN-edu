// Get global variables
let equation = document.getElementById('equation');
let result = document.getElementById('result');
let again = document.getElementById('again');
let questionNum = document.getElementById('question');
let gameStatus = document.getElementById('gameStatus');

let finished = false;

// Generate random number
let randomNumber = () => {
  questionNum.innerText = Math.floor(Math.random() * 100);
};

// Click again
again.addEventListener('click', () => {
  location.reload();
});

// Get all keys from keyboard
window.addEventListener('keyup', (e) => {
  if (!finished && !isNaN(e.key)) {
    equation.innerText += equation.innerText == '' ? e.key : ' + ' + e.key;
    result.innerText = Number(result.innerText) + Number(e.key);
    if (result.innerText == questionNum.innerText) {
      console.log('yes');
      //win
      gameStatus.innerText = 'You Win';
      finished = true;
    } else if (Number(result.innerText) > Number(questionNum.innerText)) {
      // lose
      gameStatus.innerText = 'You Lose';
      finished = true;
    }
  }
});

randomNumber();
