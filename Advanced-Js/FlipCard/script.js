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
let timeLeft = 30;
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

/**
 * Start Countdown as soon as user clicked start
 *
 * Start Countdown timer and check if the user won.
 * Game Win or Over message
 */
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

/**
 * @param {Param} array - The array to be shuffled
 */
/**
 * function shuffleArray(param) {
  for (let i = param.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [param[i], param[j]] = [param[j], param[i]]; // Swap elements
  }
}
 */

/**
 * function shuffleCards() {
  card.forEach((c) => {
    console.log(c.style);
    c.style.order = Math.floor(Math.random() * card.length);
  });
}
 */

/**
 * Shuffle Card
 */
function shuffleCards() {
  const cardArray = Array.from(card);
  console.log(cardArray);

  /**
   * For any pair of elements a and b, the comparison function returns a random number between -0.5 and 0.5.
   * If the returned value is negative (let's say -0.2), it means a should come before b in the sorted order.
   * If the returned value is positive (let's say 0.3), it means b should come before a in the sorted order.
   * If the returned value is 0, the order between a and b remains unchanged.
   */
  cardArray.sort(() => Math.random() - 0.5); // Shuffle array using sort

  // Put shuffled elements back
  cardArray.forEach((c) => {
    container.appendChild(c);
  });
}

/**
 * Click each card
 *
 * Click တာနဲ့ 'show' class ကိုခေါ်မယ် ပြီးတာနဲ့ပြန်ပျောက်မယ်
 * User က start button နှိပ်ပြီးမှသာ button click လို့ရမယ်
 */
function clickEachCard() {
  for (let i = 0; i < card.length; i++) {
    front[i].classList.add('show');

    // စစချင်းပေါ်ပြီး ပြန်ပျောက်ဖို့
    setTimeout(() => {
      front[i].classList.remove('show');
    }, 2000);

    card[i].addEventListener('click', () => {
      // User can click each card only if the game starts
      if (isGameStart) {
        // Call 'flip' class and save 2 flips
        front[i].classList.add('flip');
        const filppedCard = document.querySelectorAll('.flip');

        // if user clicks 2 flips, check if the cards match
        if (filppedCard.length == 2) {
          checkIfMatch(filppedCard[0], filppedCard[1]);
        }
      }
    });
  }
}

/**
 *
 * @param {*} cardOne User flip card one
 * @param {*} cardTwo User flip card two
 *
 * icon သုံးထားတဲ့အတွက် icon ကို string ပြန်ပြောင်းပြီးတူလား တိုက်စစ်
 * တူတယ်ဆိုရင် score ၁ပေါင်း
 * ပြီးရင် 'flip' class ပြန်ဖြုတ်ပြီး 'match' ဖြစ်တဲ့အတိုင်းထား
 *
 * 'match' class တွေအကုန်စုလိုက်ပြီး match and card length တွေတူတယ်ဆိုရင် game clear
 * မတူဘူးဆိုရင် ပြန်လှန်မယ်
 */

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

/**
 *
 * @param {*} param Game Over (or) Game Win
 */
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
