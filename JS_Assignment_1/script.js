function calculate() {
  var firstNumber = parseInt(document.getElementById('firstNumber').value);
  var secondNumber = parseInt(document.getElementById('secondNumber').value);
  var result = '';

  var option = document.getElementById('arithmetic').value;

  switch (option) {
    case 'add':
      result = firstNumber + secondNumber;
      break;
    case 'substract':
      result = firstNumber - secondNumber;
      break;
    case 'multiple':
      result = firstNumber * secondNumber;
      break;
    case 'divide':
      result = firstNumber / secondNumber;
      break;
  }

  document.getElementById('answer').innerHTML = 'Result : ' + result;
}

function show() {
  var base = parseInt(document.getElementById('base').value);
  var exponent = parseInt(document.getElementById('exponent').value);

  var result = '';
  var lineResult = 1;
  for (var i = 1; i <= exponent; i++) {
    lineResult = i * base;
    result += base + ' x ' + i + ' = ' + lineResult + '<br><br>';
  }

  document.getElementById('multiAnswer').innerHTML = result;
}
