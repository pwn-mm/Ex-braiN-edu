let question = document.getElementById('question');
let ques = question.querySelectorAll('.ques');

let inputKey = document.getElementById('inputKey');
let keys = inputKey.querySelectorAll('.key');

let correctWord = document.getElementById('correct');
let wrongWord = document.getElementById('wrong');
let wordPerMinute = document.getElementById('wpm');

let randomWord = '';

let isLimit = false;
let limitNum = '';
let limitCount = 0;

let count = 0;
let correct = 0;
let wrong = 0;

let startTime = 0;
let endTime = 0;

correctWord.innerText = 0;
wrongWord.innerText = 0;
wordPerMinute.innerText = 0;

startTime = Date.now();

let getRandomLetter = () => {
  const minCharCode = 'a'.charCodeAt(0); // Character code of 'a'
  const maxCharCode = 'z'.charCodeAt(0); // Character code of 'z'
  const randomCharCode =
    Math.floor(Math.random() * (maxCharCode - minCharCode + 1)) + minCharCode;
  return String.fromCharCode(randomCharCode);
};

/**
 * Generate a random word of a specified length
 *
 * @param {*} length User input length
 * @returns string
 */
let generateRandomWord = () => {
  limitNum = 10;
  let word = '';
  for (let i = 0; i < 10; i++) {
    word += getRandomLetter();
  }
  return word;
};

// Generate a random words
randomWord = generateRandomWord(5);

// const result = Math.random().toString(36).substring(5).replace(/[0-9]/g, '');

/**
 * Set Random Word to questions
 * Loop through each span and assign a letter from randomWord
 */
for (let i = 0; i < ques.length; i++) {
  ques[i].textContent = randomWord[i];
}

keys.forEach(function (key) {
  console.log(key.innerHTML);
});

window.addEventListener('keyup', (e) => {
  if (
    e.key !== 'Meta' &&
    e.key.match(/^[0-9a-zA-Z]$/) &&
    !isLimit &&
    e.key != null
  ) {
    console.log(e.key);
    let span = document.createElement('span');
    span.classList.add('key');
    span.textContent = e.key;
    inputKey.appendChild(span);
    count++;
    if (e.key == randomWord[limitCount]) {
      limitCount++;
    }
  }
  while (count >= limitNum) {
    isLimit = true;
    if (limitCount == limitNum) {
      correct++;
      correctWord.innerText = correct;
      endTime = Date.now(); // Record the end time
      calculateWPM();
      restartGame();
    } else {
      wrong++;
      wrongWord.innerText = wrong;
      endTime = Date.now(); // Record the end time
      calculateWPM();
      restartGame();
    }
  }
});

function calculateWPM() {
  // Calculate time taken in seconds
  const timeInSeconds = (endTime - startTime) / 1000;
  // Calculate WPM (assuming 5 characters per word)
  const charactersTyped = inputKey.textContent.length;
  const wpm = Math.round(charactersTyped / 5 / (timeInSeconds / 60));
  // Update the WPM display element
  console.log(wpm);
  wordPerMinute.innerText = wpm;
}

let restartGame = () => {
  isLimit = false;
  limitCount = 0;
  count = 0;
  inputKey.innerHTML = '';
  randomWord = generateRandomWord();
  for (let i = 0; i < ques.length; i++) {
    ques[i].textContent = randomWord[i];
  }
};
