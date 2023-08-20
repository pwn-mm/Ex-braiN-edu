const card = document.querySelectorAll('.cell');
const front = document.querySelectorAll('.front');
const container = document.querySelector('.container');
const startBtn = document.getElementById('startBtn');
const score = document.getElementById('score');
const timer = document.getElementById('timer');
const detailsContainer = document.getElementById('details');
const finalScoreContainer = document.getElementById('finalScoreContainer');
const finalScore = document.getElementById('finalscore');

let isGameClear = false;
let isGameStart = false;
let timeLeft = 20;
let countdownInterval;

function startGame() {
  isGameStart = true;
  if (isGameStart == true) {
    startBtn.disabled = true;
    startCountdown();
    shuffleCards();
    clickEachCard();
  }
}

// Start Countdown timer and check if the user won.
function startCountdown() {
  countdownInterval = setInterval(() => {
    timeLeft--;
    timer.innerText = timeLeft;

    if (timeLeft <= 0) {
      handleGameOver('over');
    } else if (isGameClear) {
      handleGameOver('clear');
    }
  }, 1000);
}

// Shuffle cards
function shuffleCards() {
  card.forEach((c) => {
    c.style = Math.floor(Math.random() * card.length);
  });
}

// Click each card
function clickEachCard() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add('show');

    setInterval(() => {
      front[i].classList.remove('show');
    }, 2000);

    card[i].addEventListener('click', () => {
      if (isGameStart) {
        front[i].classList.add('flip');
        const filppedCard = document.querySelectorAll('.flip');

        if (filppedCard.length == 2) {
          checkIfMatch(filppedCard[0], filppedCard[1]);
        }
      }
    });
  }
}

// Check if card1 and card2
function checkIfMatch(cardOne, cardTwo) {
  console.log(cardOne, cardTwo);
  const iconOne = cardOne.querySelector('.front i').classList;
  const iconTwo = cardTwo.querySelector('.front i').classList;

  if (iconOne.toString() === iconTwo.toString()) {
    score.innerHTML = parseInt(score.innerHTML) + 1;

    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');

    cardOne.classList.add('match');
    cardTwo.classList.add('match');

    // Check if all pairs of cards are matched
    const matchedCards = document.querySelectorAll('.match');
    if (matchedCards.length === card.length) {
      isGameClear = true;
    }
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flip');
      cardTwo.classList.remove('flip');
    }, 1000);
  }
}

// Handle Game Over function
function handleGameOver(param) {
  finalScoreContainer.style.display = 'block';
  finalScore.innerHTML = parseInt(score.innerHTML);

  if (param == 'over') {
    isGameStart = false;
    clearInterval(countdownInterval);
    detailsContainer.innerHTML = 'GAME OVER!';
    detailsContainer.classList.add('gameOver');
  } else if (param == 'clear') {
    clearInterval(countdownInterval);
    detailsContainer.innerHTML = '🎉 GAME CLEARED! 🎉 ';
    detailsContainer.classList.add('gameOver');
  }
}
