//? 4x4 board
var r1 = [0, 0, 0, 0];
var r2 = [0, 0, 0, 0];
var r3 = [0, 0, 0, 0];
var r4 = [0, 0, 0, 0];

//? selectors
var winnerEl = document.getElementById('winner');
var titleEl = document.getElementById('turn');

//? users
var user = 1;
var bot = 2;

var currentUser = user;

//? isFinished
var isFinished = false;

//? isBotTurn
var isBotTurn = false;

//? playGame()
function playGame(paramObj) {
  if (isFinished == false && !isBotTurn) {
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

    // console.log(isValid);
    if (isValid == true) {
      paramObj.style.transform = 'scaleY(-1)';
      if (currentUser == user) {
        titleEl.innerText = 'Bot turn';
        paramObj.style.background = '#A52A2A';
        currentUser = bot;
        isBotTurn = true;
        botTurn(paramObj.id);
      } else {
        titleEl.innerText = 'User turn';
        paramObj.style.background = '#FFD700';
        currentUser = user;
        console.log(currentUser);
      }
    }
    // isBotTurn = false;
    checkWinner();
  }
}

function botTurn(userObj) {
  var botRow, botCol;

  // Generate random row and column values for the bot
  botRow = Math.floor(Math.random() * 4 + 1);
  botCol = Math.floor(Math.random() * 4 + 1);

  var botClick = botRow + ',' + botCol;

  console.log('user', userObj);
  console.log('bot', botClick);

  if (userObj === botClick || isBotPositionSelected(botRow, botCol)) {
    botTurn(userObj);
  } else {
    setTimeout(() => {
      isBotTurn = false;
      document.getElementById(botClick).click();
    }, 1000);
  }
  console.log(currentUser);
}

// Function to check if the bot's position is already selected
function isBotPositionSelected(row, col) {
  switch (row) {
    case 1:
      if (r1[col - 1] != 0) {
        return true;
      }
      break;
    case 2:
      if (r2[col - 1] != 0) {
        return true;
      }
      break;
    case 3:
      if (r3[col - 1] != 0) {
        return true;
      }
      break;
    case 4:
      if (r4[col - 1] != 0) {
        return true;
      }
      break;
  }
  return false;
}

// Check bot or player has won the game
function checkWinner() {
  if (verticalWin(user) || horizontalWin(user) || diagonalWin(user)) {
    isFinished = true;
    winnerEl.innerText = "You've beaten the bot 🎉";
    titleEl.innerText = 'Game Over !';
  } else if (verticalWin(bot) || horizontalWin(bot) || diagonalWin(bot)) {
    isFinished = true;
    winnerEl.innerText = 'Bot beat you 😜';
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
