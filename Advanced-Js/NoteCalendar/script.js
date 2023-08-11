let days = document.getElementsByClassName('days');
let userYear = document.getElementById('year');
let userMonth = document.getElementById('month');
let newWeek = document.querySelector('.extra-week');
const addDate = document.getElementById('mydate');
var currentDate = new Date();

// Array to store holiday dates
const holidayDates = [];

showCalendar();

// Show current month date
function showCalendar() {
  currentDate.setDate(1); // Go to 1st day of the month
  let startDay = currentDate.getDay() - (currentDate.getDate() - 1);
  startDay = (startDay + 7) % 7;

  let countDate = 1;

  // end of the month
  currentDate.setMonth(currentDate.getMonth() + 1); // go to next month
  currentDate.setDate(0); // last date of current month
  let endDate = currentDate.getDate();

  // Clear previous dates and hide extra week
  for (let i = 0; i < days.length; i++) {
    days[i].innerText = '';
    days[i].classList.remove('this-month', 'holiday');
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

      // Apply 'holiday' class if the date is a holiday
      if (
        holidayDates[currentDate.getFullYear()] &&
        holidayDates[currentDate.getFullYear()][currentDate.getMonth()] &&
        holidayDates[currentDate.getFullYear()][currentDate.getMonth()][
          countDate - 1
        ]
      ) {
        days[i].classList.add('holiday', 'active');
      }
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
  if (userYear.value && userMonth.value) {
    var year = userYear.value;
    var month = userMonth.value - 1;
    console.log(year, month);
    currentDate = new Date(year, month, 1);
    showCalendar();
  }
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

  // Store the selected holiday date
  if (!holidayDates[selectedYear]) {
    holidayDates[selectedYear] = [];
  }
  if (!holidayDates[selectedYear][selectedMonth]) {
    holidayDates[selectedYear][selectedMonth] = {};
  }
  holidayDates[selectedYear][selectedMonth][selectedDay] = true;

  // Update the calendar display
  showCalendar();
}
