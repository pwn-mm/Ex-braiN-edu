//? 4x4 board
var r1 = [0, 0, 0, 0];
var r2 = [0, 0, 0, 0];
var r3 = [0, 0, 0, 0];
var r4 = [0, 0, 0, 0];

//? selectors
var currentUserEl = document.getElementById('currentUser');
var winnerEl = document.getElementById('winner');
var titleEl = document.getElementById('turn');

//? users
var userOne = 1;
var userTwo = 2;

var currentUser = userOne;
currentUserEl.innerText = currentUser;

//? isFinished
var isFinished = false;

//? playGame()
function playGame(paramObj) {
  if (isFinished == false) {
    // get clicked row and column
    var temp = paramObj.id.split(',');
    // clicked row
    var clickedRow = Number(temp[0]);
    // clicked column
    var clickedCol = Number(temp[1] - 1);

    // isValid to click
    var isValid = true;

    //   Check which row
    switch (clickedRow) {
      case 1:
        if (r1[clickedCol] != 0) {
          isValid = false;
          break;
        }
        r1[clickedCol] = currentUser;
        break;
      case 2:
        if (r2[clickedCol] != 0) {
          isValid = false;
          break;
        }
        r2[clickedCol] = currentUser;
        break;
      case 3:
        if (r3[clickedCol] != 0) {
          isValid = false;
          break;
        }
        r3[clickedCol] = currentUser;
        break;
      case 4:
        if (r4[clickedCol] != 0) {
          isValid = false;
          break;
        }
        r4[clickedCol] = currentUser;
        break;
    }

    console.log(isValid);

    if (isValid == true) {
      paramObj.style.transform = 'scaleY(-1)';
      if (currentUser == userOne) {
        currentUserEl.innerText = userTwo;
        paramObj.style.background = '#A52A2A';
        currentUser = userTwo;
      } else {
        currentUserEl.innerText = userOne;
        paramObj.style.background = '#FFD700';
        currentUser = userOne;
      }
    }

    checkWinner();
  }
}

function checkWinner() {
  if (verticalWin(userOne) || horizontalWin(userOne) || diagonalWin(userOne)) {
    isFinished = true;
    winnerEl.innerText = 'Winner : Player 1 ! 🎉';
    titleEl.innerText = 'Game Over !';
  } else if (
    verticalWin(userTwo) ||
    horizontalWin(userTwo) ||
    diagonalWin(userTwo)
  ) {
    isFinished = true;
    winnerEl.innerText = 'Winner : Player 2 ! 🎉';
    titleEl.innerText = 'Game Over !';
  } else if (checkDraw() == true) {
    winnerEl.innerText = 'Draw !';
    titleEl.innerText = 'Game Over !';
  }
}

// Check the vertically winning case

function verticalWin(player) {
  for (let i = 0; i < 4; i++) {
    if (
      r1[i] == player &&
      r2[i] == player &&
      r3[i] == player &&
      r4[i] == player
    )
      return true;
  }
  return false;
}

// Check the horizontally winning case

function horizontalWin(player) {
  const rows = [r1, r2, r3, r4];

  for (let i = 0; i < rows.length; i++) {
    if (
      rows[i][0] == player &&
      rows[i][1] == player &&
      rows[i][2] == player &&
      rows[i][3] == player
    ) {
      return true;
    }
  }

  return false;
}

// Check the diagonally winning case

function diagonalWin(player) {
  if (
    r1[0] == player &&
    r2[1] == player &&
    r3[2] == player &&
    r4[3] == player
  ) {
    return true;
  }

  if (
    r1[3] == player &&
    r2[2] == player &&
    r3[1] == player &&
    r4[0] == player
  ) {
    return true;
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < r1.length; i++) {
    if (r1[i] === 0) {
      return false;
    }
  }

  for (let i = 0; i < r2.length; i++) {
    if (r2[i] === 0) {
      return false;
    }
  }

  for (let i = 0; i < r3.length; i++) {
    if (r3[i] === 0) {
      return false;
    }
  }

  for (let i = 0; i < r4.length; i++) {
    if (r4[i] === 0) {
      return false;
    }
  }

  return true;
}
