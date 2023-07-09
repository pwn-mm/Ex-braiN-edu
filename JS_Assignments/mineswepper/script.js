var mine1, p1, p2, p3, p4, p5, p6, p7, p8;
var mine2, p9, p10, p11, p12, p13, p14, p15, p16;
var mine3, p17, p18, p19, p20, p21, p22, p23, p24;

var gameStart = false;
var gameOver = false;

var selectedLevel;
var selectLevel = document.getElementById('levelSelect');

var count = 0;

var totalCellsWithoutOneBomb = 35;
var totalCellsWithoutTwoBombs = 34;
var totalCellsWithoutThreeBombs = 33;

var totalCells = 36;

var cells = document.getElementsByClassName('cell');

var startBtn = document.getElementById('gameStartBtn');

var restartBtn = document.getElementById('restartBtn');
restartBtn.disabled = true;

/**
 * Start Game
 *
 * Game start depending on the level that user choose
 */
function startGame() {
  gameStart = true;

  startBtn.disabled = true;
  startBtn.setAttribute('class', 'gameStartBtn inactiveBtn');

  restartBtn.disabled = false;
  restartBtn.setAttribute('class', 'restartBtn activeBtn');

  selectLevel.disabled = true;

  // Check the user selected level
  selectedLevel = selectLevel.value;
  if (selectedLevel == '1') {
    console.log('Bomb 1');
    buildFirstMine();
  } else if (selectedLevel == '2') {
    console.log('Bomb 2');
    buildFirstMine();
    buildSecondMine();
  } else {
    console.log('Bomb 3');
    buildFirstMine();
    buildSecondMine();
    buildThirdMine();
  }
}

// Set the first mine
function buildFirstMine() {
  var xAxis1 = Math.floor(Math.random() * 6 + 1);
  var yAxis1 = Math.floor(Math.random() * 6 + 1);
  mine1 = xAxis1 + '' + yAxis1;

  //   To check the valid position near first mine
  p1 = xAxis1 - 1 + '' + (yAxis1 - 1);
  p2 = xAxis1 - 1 + '' + yAxis1;
  p3 = xAxis1 - 1 + '' + (yAxis1 + 1);
  p4 = xAxis1 + '' + (yAxis1 - 1);
  p5 = xAxis1 + '' + (yAxis1 + 1);
  p6 = xAxis1 + 1 + '' + (yAxis1 - 1);
  p7 = xAxis1 + 1 + '' + yAxis1;
  p8 = xAxis1 + 1 + '' + (yAxis1 + 1);

  console.log(mine1);
}

// Set the second mine
function buildSecondMine() {
  var xAxis2 = Math.floor(Math.random() * 6 + 1);
  var yAxis2 = Math.floor(Math.random() * 6 + 1);
  mine2 = xAxis2 + '' + yAxis2;

  while (
    mine2 == mine1 ||
    mine2 == p1 ||
    mine2 == p2 ||
    mine2 == p3 ||
    mine2 == p4 ||
    mine2 == p5 ||
    mine2 == p6 ||
    mine2 == p7 ||
    mine2 == p8
  ) {
    xAxis2 = Math.floor(Math.random() * 6 + 1);
    yAxis2 = Math.floor(Math.random() * 6 + 1);
    mine2 = xAxis2 + '' + yAxis2;
  }

  p9 = xAxis2 - 1 + '' + (yAxis2 - 1);
  p10 = xAxis2 - 1 + '' + yAxis2;
  p11 = xAxis2 - 1 + '' + (yAxis2 + 1);
  p12 = xAxis2 + '' + (yAxis2 - 1);
  p13 = xAxis2 + '' + (yAxis2 + 1);
  p14 = xAxis2 + 1 + '' + (yAxis2 - 1);
  p15 = xAxis2 + 1 + '' + yAxis2;
  p16 = xAxis2 + 1 + '' + (yAxis2 + 1);

  console.log(mine2);
}

// Set the third mine
function buildThirdMine() {
  var xAxis3 = Math.floor(Math.random() * 6 + 1);
  var yAxis3 = Math.floor(Math.random() * 6 + 1);
  mine3 = xAxis3 + '' + yAxis3;

  while (
    mine3 == mine1 ||
    mine3 == p1 ||
    mine3 == p3 ||
    mine3 == p3 ||
    mine3 == p4 ||
    mine3 == p5 ||
    mine3 == p6 ||
    mine3 == p7 ||
    mine3 == p8 ||
    mine3 == mine2 ||
    mine3 == p9 ||
    mine3 == p10 ||
    mine3 == p11 ||
    mine3 == p12 ||
    mine3 == p13 ||
    mine3 == p14 ||
    mine3 == p15 ||
    mine3 == p16
  ) {
    xAxis3 = Math.floor(Math.random() * 6 + 1);
    yAxis3 = Math.floor(Math.random() * 6 + 1);
    mine3 = xAxis3 + '' + yAxis3;
  }

  p17 = xAxis3 - 1 + '' + (yAxis3 - 1);
  p18 = xAxis3 - 1 + '' + yAxis3;
  p19 = xAxis3 - 1 + '' + (yAxis3 + 1);
  p20 = xAxis3 + '' + (yAxis3 - 1);
  p21 = xAxis3 + '' + (yAxis3 + 1);
  p22 = xAxis3 + 1 + '' + (yAxis3 - 1);
  p23 = xAxis3 + 1 + '' + yAxis3;
  p24 = xAxis3 + 1 + '' + (yAxis3 + 1);

  console.log(mine3);
}

// Click each cell
function press(cellObj) {
  /**
   * Logic when the press function should work
   *
   *  - gameStart must == true
   *  - gameOver must == false
   *  - count should not be the same depending on the game level
   *  - in game level 1 : 35 counts without one bomb
   *  - in game level 2 : 34 counts without two bombs
   */
  var isLevel1 = selectedLevel === '1';
  var isLevel2 = selectedLevel === '2';

  if (
    gameStart &&
    gameOver == false &&
    (isLevel1
      ? totalCellsWithoutOneBomb
      : isLevel2
      ? totalCellsWithoutTwoBombs
      : totalCellsWithoutThreeBombs)
  ) {
    var userClickCell = cellObj.id;

    /**
     * Main 3 logics for the game
     *
     * Condition 1 : User directly clicks the bomb
     * Condition 2 : User clicks all the cells except the bomb
     * Condition 3 : User click safe cells
     */

    // Condition 1 : User directly clicks the bomb
    if (
      userClickCell == mine1 ||
      userClickCell == mine2 ||
      userClickCell == mine3
    ) {
      document.getElementById('gameOver').play();
      cellObj.style.backgroundColor = 'red';
      cellObj.innerText = 'BOMB';
      gameOverAnnounce();
    }
    // Condition 2 : User clicks the cells those around the bomb but not touching the bomb
    else if (
      userClickCell == p1 ||
      userClickCell == p2 ||
      userClickCell == p3 ||
      userClickCell == p4 ||
      userClickCell == p5 ||
      userClickCell == p6 ||
      userClickCell == p7 ||
      userClickCell == p8 ||
      userClickCell == p9 ||
      userClickCell == p10 ||
      userClickCell == p11 ||
      userClickCell == p12 ||
      userClickCell == p13 ||
      userClickCell == p14 ||
      userClickCell == p15 ||
      userClickCell == p16 ||
      userClickCell == p17 ||
      userClickCell == p18 ||
      userClickCell == p19 ||
      userClickCell == p20 ||
      userClickCell == p21 ||
      userClickCell == p22 ||
      userClickCell == p23 ||
      userClickCell == p24 ||
      userClickCell == mine1 ||
      userClickCell == mine2 ||
      userClickCell == mine3
    ) {
      document.getElementById('clickSound').play();
      count += 1;
      cellObj.style.backgroundColor = 'red';
      cellObj.innerText = '1';
      cellObj.onclick = null;
      checkWin();
    }
    // Condition 3 : User click clearly without touching any bombs
    else {
      document.getElementById('clickSound').play();
      count += 1;
      cellObj.style.backgroundColor = 'teal';
      cellObj.onclick = null;
      checkWin();
    }
  }
}

/**
 * Game Over()
 *
 * if user directly click one of two bombs, GAME OVER.
 */
function gameOverAnnounce() {
  gameOver = true;

  for (let i = 0; i < totalCells; i++) {
    document.getElementsByClassName('cell')[i].style.backgroundColor = 'red';
  }

  // Reset '1' texts before showing Game Over message
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }

  document.getElementById('32').innerText = 'G';
  document.getElementById('33').innerText = 'A';
  document.getElementById('34').innerText = 'M';
  document.getElementById('35').innerText = 'E';

  document.getElementById('42').innerText = 'O';
  document.getElementById('43').innerText = 'V';
  document.getElementById('44').innerText = 'E';
  document.getElementById('45').innerText = 'R';
}

/**
 * Check Win Function
 *
 * Check everytime after user press if the user won the game
 */
function checkWin() {
  if (selectedLevel == '1') {
    gameWin(count, totalCellsWithoutOneBomb);
  } else if (selectedLevel == '2') {
    gameWin(count, totalCellsWithoutTwoBombs);
  } else {
    gameWin(count, totalCellsWithoutThreeBombs);
  }
}

/**
 * Main Logic for showing game win()
 *
 * @param {Number} count  : Total times that the user presses
 * @param {Number} totalCellsWithoutBombs : Decide bomb quantity depending on the user's choosen level
 */
function gameWin(count, totalCellsWithoutBombs) {
  if (count === totalCellsWithoutBombs) {
    gameOver = true;

    // Reset '1' texts before showing Game Win message
    for (var i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
    }

    document.getElementById('gameWin').play();
    for (let i = 0; i < totalCells; i++) {
      document.getElementsByClassName('cell')[i].style.backgroundColor = 'teal';
    }

    document.getElementById('32').innerText = 'G';
    document.getElementById('33').innerText = 'A';
    document.getElementById('34').innerText = 'M';
    document.getElementById('35').innerText = 'E';

    document.getElementById('42').innerText = 'W';
    document.getElementById('43').innerText = 'I';
    document.getElementById('44').innerText = 'N';
    document.getElementById('45').innerText = '!';
  }
}

/**
 * Restart game()
 *
 * restart all mines, positions and cells
 */

function restartGame() {
  restartBtn.disabled = true;
  restartBtn.setAttribute('class', 'restartBtn inactiveBtn');

  gameStart = false;
  gameOver = false;
  count = 0;

  startBtn.disabled = false;
  startBtn.setAttribute('class', 'gameStartBtn activeBtn');

  restartBtn.disabled = true;
  selectLevel.disabled = false;

  document.getElementById('gameOver').pause();
  document.getElementById('gameWin').pause();

  mine1 = null;
  mine2 = null;
  mine3 = null;

  p1 = '';
  p3 = '';
  p3 = '';
  p4 = '';
  p5 = '';
  p6 = '';
  p7 = '';
  p8 = '';
  p9 = '';
  p10 = '';
  p11 = '';
  p12 = '';
  p13 = '';
  p14 = '';
  p15 = '';
  p16 = '';
  p17 = '';
  p18 = '';
  p19 = '';
  p20 = '';
  p21 = '';
  p22 = '';
  p23 = '';
  p24 = '';

  // Reset press function
  for (var i = 0; i < cells.length; i++) {
    cells[i].style.backgroundColor = '';
    cells[i].innerText = '';
    cells[i].onclick = function () {
      press(this);
    };
  }

  // Reset game over messages
  document.getElementById('32').innerText = '';
  document.getElementById('33').innerText = '';
  document.getElementById('34').innerText = '';
  document.getElementById('35').innerText = '';

  document.getElementById('42').innerText = '';
  document.getElementById('43').innerText = '';
  document.getElementById('44').innerText = '';
  document.getElementById('45').innerText = '';
}
