const textarea = document.getElementById('user-string-output');
const resultArea = document.getElementById('result');
const buttons = document.querySelectorAll('.btn');

const deleteBtn = document.getElementById('delete');
const spaceBar = document.getElementById('space');
const keyCap = document.getElementById('keycap');

const inputString = document.getElementById('userInput');

buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    textarea.value += btn.innerText;
  });
});

deleteBtn.addEventListener('click', () => {
  textarea.value = textarea.value.slice(0, -1);
});

spaceBar.addEventListener('click', () => {
  textarea.value += ' ';
});

keyCap.addEventListener('click', () => {
  buttons.forEach((btn) => {
    btn.classList.toggle('upper');
  });
});

// Reset Value
function reset() {
  textarea.value = '';
  resultArea.value = '';
  inputString.value = '';
}

// Calculate each method
function calculate(method) {
  const textValue = textarea.value;
  const inputValue = inputString.value;

  let result = '';

  switch (method) {
    case 'cat':
      const charAtIndex = parseInt(inputValue);
      if (charAtIndex >= 0 && charAtIndex < textValue.length) {
        result = textValue.charAt(charAtIndex);
      } else {
        alert('Invalid index!');
      }
      break;

    case 'codeAt':
      const charCodeIndex = parseInt(inputValue);
      if (charCodeIndex >= 0 && charCodeIndex < textValue.length) {
        result = textValue.charCodeAt(charCodeIndex);
      } else {
        alert('Invalid index!');
      }
      break;

    case 'upper':
      result = textValue
        ? textValue.toUpperCase()
        : alert('Must Enter a value');
      break;

    case 'lower':
      result = textValue
        ? textValue.toLowerCase()
        : alert('Must Enter a value');
      break;

    case 'trim':
      result = String(textarea.value).trim();
      break;

    case 'inc':
      result = inputValue
        ? textValue.includes(inputValue)
        : alert('Must Enter a value');
      break;

    case 'idOf':
      result = inputValue
        ? textValue.indexOf(inputValue)
        : alert('Must Enter a value');
      break;

    case 'lidOf':
      result = inputValue
        ? textValue.lastIndexOf(inputValue)
        : alert('Must Enter a value');
      break;
      break;

    case 'sw':
      if (inputValue) {
        result = textValue.startsWith(inputValue);
      } else {
        alert('Enter a valid value');
      }
      break;

    case 'ew':
      if (inputValue) {
        result = textValue.endsWith(inputValue);
      } else {
        alert('Enter a valid value');
      }
      break;

    case 'rmspace':
      result = textValue ? textValue.split(' ').join('') : 'Must Enter a value';
      break;

    default:
      alert('Invalid method!');
      break;
  }

  resultArea.value = result == undefined ? '' : result;
}
