let days = document.getElementsByClassName('days');
let userYear = document.getElementById('year');
let userMonth = document.getElementById('month');
let newWeek = document.querySelector('.extra-week');
const addDate = document.getElementById('mydate');
var currentDate = new Date();
showCalendar();

// Show current month date
function showCalendar() {
  currentDate.setDate(1); // Go to 1st day of the month
  let startDay = currentDate.getDay(); // 0 - 6 (Sunday = 0)
  let countDate = 1;

  // end of the month
  currentDate.setMonth(currentDate.getMonth() + 1); // go to next month
  currentDate.setDate(0); // last date of current month
  let endDate = currentDate.getDate();

  // Clear previous dates and hide extra week
  for (let i = 0; i < days.length; i++) {
    days[i].innerText = '';
    days[i].classList.remove('this-month');
  }

  let weekCount = 1; // Initialize to 1 for the first week
  let newLine = false;

  const today = new Date();
  // 7 days a week / up to 6 weeks
  for (let i = 0; i < 42; i++) {
    if ((i >= startDay || newLine) && countDate <= endDate) {
      days[i].innerText = countDate++;
      newLine = true;

      /**
       * When i = 0, i % 7 => 0
       * When i = 1, i % 7 => 1
       * ...
       * When i = 7, i % 7 => 0 => start of second week
       */
      if (i % 7 == 6) weekCount++; // update a new week

      // Add style to current date
      const isCurrentDay =
        countDate - 1 === today.getDate() &&
        currentDate.getMonth() === today.getMonth() &&
        currentDate.getFullYear() === today.getFullYear();
      days[i].classList.toggle('active', isCurrentDay);
    } else {
      days[i].innerText = '';
      days[i].classList.remove('active');
    }
  }

  // Only shows when the week is equals to 6 or more
  newWeek.style.display = weekCount >= 6 ? 'flex' : 'none';
}

// Calculate user's input month
function calculate() {
  if (!userYear.value || !userMonth.value) {
    alert('Please enter both year and month.');
    return;
  }

  var year = userYear.value;
  var month = parseInt(userMonth.value) - 1;

  if (isNaN(month) || month < 0 || month > 11 || isNaN(year)) {
    alert('Please enter a valid month (1 - 12) and valid year number.');
    return;
  }

  currentDate = new Date(year, month, 1);
  showCalendar();
}

function resetCalendar() {
  userYear.value = '';
  userMonth.value = '';
  addDate.value = '';
  currentDate = new Date();
  showCalendar();
}

function addHoliday() {
  const selectedDate = new Date(addDate.value);

  // Extract year, month, and day from the selected date
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const selectedDay = selectedDate.getDate();

  // Loop through each day element and check if it matches the selected date
  for (let i = 0; i < 42; i++) {
    const dayElement = days[i];
    const dayOfMonth = parseInt(dayElement.innerText);

    // Get the year, month, and day for the current day element
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = dayOfMonth;

    // Compare the selected date with the current day element's date
    if (
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      selectedDay === currentDay
    ) {
      dayElement.classList.add('holiday', 'active');
    }
  }
}
