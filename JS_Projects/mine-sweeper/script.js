var mine, p1, p2, p3, p4, p5, p6, p7, p8;
var over = false;

mineBuild();

function mineBuild() {
  var xAxis = Math.floor(Math.random() * 6 + 1);
  var yAxis = Math.floor(Math.random() * 6 + 1);

  mine = xAxis + '' + yAxis;

  //   Check the position near mine
  p1 = xAxis - 1 + '' + (yAxis - 1);
  p2 = xAxis - 1 + '' + yAxis;
  p3 = xAxis - 1 + '' + (yAxis + 1);
  p4 = xAxis + '' + (yAxis - 1);
  p5 = xAxis + '' + (yAxis + 1);
  p6 = xAxis + 1 + '' + (yAxis - 1);
  p7 = xAxis + 1 + '' + yAxis;
  p8 = xAxis + 1 + '' + (yAxis + 1);
}

function press(obj) {
  if (over == false) {
    var userClickCell = obj.id;

    /**
     * Condition 1 : User directly click the bomb
     * Condition 2 : User click around cell of the bomb
     * Condition 3 : User click clearly
     */

    // Condition 1
    if (userClickCell == mine) {
      document.getElementById('gameOver').play();
      obj.style.backgroundColor = 'red';
      obj.innerText = 'BOMB';
      gameOverDisplay();
    }
    // Condition 2
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
      obj.style.backgroundColor = 'red';
      obj.innerText = '1';
    }
    // Condition 3
    else {
      document.getElementById('clickSound').play();
      obj.style.backgroundColor = 'teal';
    }
  }
}

// GameOver
function gameOverDisplay() {
  over = true;
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
