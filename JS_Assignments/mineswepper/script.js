var mine, p1, p2, p3, p4, p5, p6, p7, p8;
var gameOver = false;
var count = 0;
var totalCellsWithoutBomb = 35;
buildMine();

// set the mine for the game
function buildMine() {
  var xAxis = Math.floor(Math.random() * 6 + 1);
  var yAxis = Math.floor(Math.random() * 6 + 1);

  mine = xAxis + '' + yAxis;
  console.log(mine);

  //   To check the valid position near mine
  p1 = xAxis - 1 + '' + (yAxis - 1);
  p2 = xAxis - 1 + '' + yAxis;
  p3 = xAxis - 1 + '' + (yAxis + 1);
  p4 = xAxis + '' + (yAxis - 1);
  p5 = xAxis + '' + (yAxis + 1);
  p6 = xAxis + 1 + '' + (yAxis - 1);
  p7 = xAxis + 1 + '' + yAxis;
  p8 = xAxis + 1 + '' + (yAxis + 1);
}

// click each cell
function press(cellObj) {
  if (gameOver == false || count !== totalCellsWithoutBomb) {
    var userClickCell = cellObj.id;

    /**
     * Main 3 logics for the game
     *
     * Condition 1 : User directly clicks the bomb
     * Condition 2 : User clicks the cell that touching the bomb
     * Condition 3 : User clicks all the cells except the bomb
     * Condition 4 : User click safe cells
     */

    // Condition 1 : User directly clicks the bomb
    if (userClickCell == mine) {
      document.getElementById('gameOver').play();
      cellObj.style.backgroundColor = 'red';
      cellObj.innerText = 'BOMB';
      gameOverAnnounce();
    }
    // Condition 2 : User clicks the cell that touching the bomb
    else if (
      userClickCell == p1 ||
      userClickCell == p2 ||
      userClickCell == p3 ||
      userClickCell == p4 ||
      userClickCell == p5 ||
      userClickCell == p6 ||
      userClickCell == p7 ||
      userClickCell == p8
    ) {
      document.getElementById('clickSound').play();
      count += 1;
      cellObj.style.backgroundColor = 'red';
      cellObj.innerText = '1';
      cellObj.onclick = null;
      checkWin();
    }
    // Condition 4 : User click clearly
    else {
      document.getElementById('clickSound').play();
      count += 1;
      cellObj.style.backgroundColor = 'teal';
      cellObj.onclick = null;
      checkWin();
    }
  }
}

// Announce when the game's over
function gameOverAnnounce() {
  gameOver = true;

  for (let i = 0; i < 36; i++) {
    document.getElementsByClassName('cell')[i].style.backgroundColor = 'red';
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

// Check if the user won the game
function checkWin() {
  if (count === totalCellsWithoutBomb) {
    gameOver = true;
    document.getElementById('gameWin').play();
    for (let i = 0; i < 36; i++) {
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
