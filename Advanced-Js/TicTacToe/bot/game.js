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

  // check potential winning move by the user
  var userMove = checkUserWinMove(user);

  var botMove = checkBotWinMove(bot);

  if (botMove) {
    var [row, col] = botMove;
    botRow = row;
    botCol = col;
  } else if (userMove) {
    console.log(userMove);
    var [row, col] = userMove;
    botRow = row;
    botCol = col;
  } else {
    // If there's no potential winning move by the user, generate random row and column values for the bot
    botRow = Math.floor(Math.random() * 4 + 1);
    botCol = Math.floor(Math.random() * 4 + 1);

    // Check if the bot's random move is already selected by the user or another bot
    while (
      userObj === botRow + ',' + botCol ||
      isBotPositionSelected(botRow, botCol)
    ) {
      botRow = Math.floor(Math.random() * 4 + 1);
      botCol = Math.floor(Math.random() * 4 + 1);
    }
  }

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

// Check the winning move by user and block that move
function checkUserWinMove(player) {
  // Every cell value of r1
  const r1_0 = r1[0];
  const r1_1 = r1[1];
  const r1_2 = r1[2];
  const r1_3 = r1[3];

  // Every cell value of r2
  const r2_0 = r2[0];
  const r2_1 = r2[1];
  const r2_2 = r2[2];
  const r2_3 = r2[3];

  // Every cell value of r3
  const r3_0 = r3[0];
  const r3_1 = r3[1];
  const r3_2 = r3[2];
  const r3_3 = r3[3];

  // Every cell value of r4
  const r4_0 = r4[0];
  const r4_1 = r4[1];
  const r4_2 = r4[2];
  const r4_3 = r4[3];

  // where each group of 4 elements represents a row.
  const board = [
    // r1
    r1_0,
    r1_1,
    r1_2,
    r1_3,

    // r2
    r2_0,
    r2_1,
    r2_2,
    r2_3,

    // r3
    r3_0,
    r3_1,
    r3_2,
    r3_3,

    // r4
    r4_0,
    r4_1,
    r4_2,
    r4_3,
  ];

  // Check the user's winning move in horizontal rows
  for (let i = 0; i < 4; i++) {
    const rowIndex = i * 4;

    if (
      board[rowIndex] == player &&
      board[rowIndex + 1] == player &&
      board[rowIndex + 2] == player &&
      board[rowIndex + 3] == 0
    ) {
      return [i + 1, 4];
    }
    if (
      board[rowIndex] == player &&
      board[rowIndex + 1] == player &&
      board[rowIndex + 2] == 0 &&
      board[rowIndex + 3] == player
    ) {
      return [i + 1, 3];
    }
    if (
      board[rowIndex] == player &&
      board[rowIndex + 1] == 0 &&
      board[rowIndex + 2] == player &&
      board[rowIndex + 3] == player
    ) {
      return [i + 1, 2];
    }
    if (
      board[rowIndex] == 0 &&
      board[rowIndex + 1] == player &&
      board[rowIndex + 2] == player &&
      board[rowIndex + 3] == player
    ) {
      return [i + 1, 1];
    }
  }

  // Check the user's winning move in vertical columns
  for (let i = 0; i < 4; i++) {
    const colIndex = i;

    if (
      board[colIndex] == player &&
      board[colIndex + 4] == player &&
      board[colIndex + 8] == player &&
      board[colIndex + 12] == 0
    ) {
      return [4, i + 1];
    }
    if (
      board[colIndex] == player &&
      board[colIndex + 4] == player &&
      board[colIndex + 8] == 0 &&
      board[colIndex + 12] == player
    ) {
      return [3, i + 1];
    }
    if (
      board[colIndex] == player &&
      board[colIndex + 4] == 0 &&
      board[colIndex + 8] == player &&
      board[colIndex + 12] == player
    ) {
      return [2, i + 1];
    }
    if (
      board[colIndex] == 0 &&
      board[colIndex + 4] == player &&
      board[colIndex + 8] == player &&
      board[colIndex + 12] == player
    ) {
      return [1, i + 1];
    }
  }

  // Check the user's winning move in diagonal

  // Diagonal From Left top to right bottom
  if (
    board[0] == player &&
    board[5] == player &&
    board[10] == player &&
    board[15] == 0
  ) {
    return [4, 4]; // return user's winning row and column
  }

  if (
    board[0] == player &&
    board[5] == player &&
    board[10] == 0 &&
    board[15] == player
  ) {
    return [3, 3]; // return user's winning row and column
  }

  if (
    board[0] == player &&
    board[5] == 0 &&
    board[10] == player &&
    board[15] == player
  ) {
    return [2, 2]; // return user's winning row and column
  }

  if (
    board[0] == 0 &&
    board[5] == player &&
    board[10] == player &&
    board[15] == player
  ) {
    return [1, 1]; // return user's winning row and column
  }

  // Diagonal From Right top to left bottom
  if (
    board[3] == player &&
    board[6] == player &&
    board[9] == player &&
    board[12] == 0
  ) {
    return [4, 1]; // return user's winning row and column
  }

  if (
    board[3] == player &&
    board[6] == player &&
    board[9] == 0 &&
    board[12] == player
  ) {
    return [3, 2]; // return user's winning row and column
  }

  if (
    board[3] == player &&
    board[6] == 0 &&
    board[9] == player &&
    board[12] == player
  ) {
    return [2, 3]; // return user's winning row and column
  }

  if (
    board[3] == 0 &&
    board[6] == player &&
    board[9] == player &&
    board[12] == player
  ) {
    return [1, 4]; // return user's winning row and column
  }

  // Return something in case there is no winning move
  return null;
}

// Check the winning move by bot and place that move
function checkBotWinMove(player) {
  // Every cell value of r1
  const r1_0 = r1[0];
  const r1_1 = r1[1];
  const r1_2 = r1[2];
  const r1_3 = r1[3];

  // Every cell value of r2
  const r2_0 = r2[0];
  const r2_1 = r2[1];
  const r2_2 = r2[2];
  const r2_3 = r2[3];

  // Every cell value of r3
  const r3_0 = r3[0];
  const r3_1 = r3[1];
  const r3_2 = r3[2];
  const r3_3 = r3[3];

  // Every cell value of r4
  const r4_0 = r4[0];
  const r4_1 = r4[1];
  const r4_2 = r4[2];
  const r4_3 = r4[3];

  // where each group of 4 elements represents a row.
  const board = [
    // r1
    r1_0,
    r1_1,
    r1_2,
    r1_3,

    // r2
    r2_0,
    r2_1,
    r2_2,
    r2_3,

    // r3
    r3_0,
    r3_1,
    r3_2,
    r3_3,

    // r4
    r4_0,
    r4_1,
    r4_2,
    r4_3,
  ];

  // Check the user's winning move in horizontal rows
  for (let i = 0; i < 4; i++) {
    const rowIndex = i * 4;

    if (
      board[rowIndex] == player &&
      board[rowIndex + 1] == player &&
      board[rowIndex + 2] == player &&
      board[rowIndex + 3] == 0
    ) {
      return [i + 1, 4];
    }
    if (
      board[rowIndex] == player &&
      board[rowIndex + 1] == player &&
      board[rowIndex + 2] == 0 &&
      board[rowIndex + 3] == player
    ) {
      return [i + 1, 3];
    }
    if (
      board[rowIndex] == player &&
      board[rowIndex + 1] == 0 &&
      board[rowIndex + 2] == player &&
      board[rowIndex + 3] == player
    ) {
      return [i + 1, 2];
    }
    if (
      board[rowIndex] == 0 &&
      board[rowIndex + 1] == player &&
      board[rowIndex + 2] == player &&
      board[rowIndex + 3] == player
    ) {
      return [i + 1, 1];
    }
  }

  // Check the user's winning move in vertical columns
  for (let i = 0; i < 4; i++) {
    const colIndex = i;

    if (
      board[colIndex] == player &&
      board[colIndex + 4] == player &&
      board[colIndex + 8] == player &&
      board[colIndex + 12] == 0
    ) {
      return [4, i + 1];
    }
    if (
      board[colIndex] == player &&
      board[colIndex + 4] == player &&
      board[colIndex + 8] == 0 &&
      board[colIndex + 12] == player
    ) {
      return [3, i + 1];
    }
    if (
      board[colIndex] == player &&
      board[colIndex + 4] == 0 &&
      board[colIndex + 8] == player &&
      board[colIndex + 12] == player
    ) {
      return [2, i + 1];
    }
    if (
      board[colIndex] == 0 &&
      board[colIndex + 4] == player &&
      board[colIndex + 8] == player &&
      board[colIndex + 12] == player
    ) {
      return [1, i + 1];
    }
  }

  // Check the user's winning move in diagonal

  // Diagonal From Left top to right bottom
  if (
    board[0] == player &&
    board[5] == player &&
    board[10] == player &&
    board[15] == 0
  ) {
    return [4, 4]; // return user's winning row and column
  }

  if (
    board[0] == player &&
    board[5] == player &&
    board[10] == 0 &&
    board[15] == player
  ) {
    return [3, 3]; // return user's winning row and column
  }

  if (
    board[0] == player &&
    board[5] == 0 &&
    board[10] == player &&
    board[15] == player
  ) {
    return [2, 2]; // return user's winning row and column
  }

  if (
    board[0] == 0 &&
    board[5] == player &&
    board[10] == player &&
    board[15] == player
  ) {
    return [1, 1]; // return user's winning row and column
  }

  // Diagonal From Right top to left bottom
  if (
    board[3] == player &&
    board[6] == player &&
    board[9] == player &&
    board[12] == 0
  ) {
    return [4, 1]; // return user's winning row and column
  }

  if (
    board[3] == player &&
    board[6] == player &&
    board[9] == 0 &&
    board[12] == player
  ) {
    return [3, 2]; // return user's winning row and column
  }

  if (
    board[3] == player &&
    board[6] == 0 &&
    board[9] == player &&
    board[12] == player
  ) {
    return [2, 3]; // return user's winning row and column
  }

  if (
    board[3] == 0 &&
    board[6] == player &&
    board[9] == player &&
    board[12] == player
  ) {
    return [1, 4]; // return user's winning row and column
  }

  // Return something in case there is no winning move
  return null;
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
    winnerEl.innerText = 'You beat the bot 🎉';
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
    if (r1[i] == 0) {
      return false;
    }
  }

  for (let i = 0; i < r2.length; i++) {
    if (r2[i] == 0) {
      return false;
    }
  }

  for (let i = 0; i < r3.length; i++) {
    if (r3[i] == 0) {
      return false;
    }
  }

  for (let i = 0; i < r4.length; i++) {
    if (r4[i] == 0) {
      return false;
    }
  }

  return true;
}
