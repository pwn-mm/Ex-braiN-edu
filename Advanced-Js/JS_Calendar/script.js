const daysContainer = document.querySelector('.days');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const month = document.querySelector('.month');
const todayBtn = document.querySelector('.today-btn');
const userYear = document.getElementById('year');
const userMonth = document.getElementById('month');

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// get current date
const date = new Date();

// get current month
let currentMonth = date.getMonth();

// get current year
let currentYear = date.getFullYear();

function startCalendar() {
  // Get previous month, current month and next month days
  date.setDate(1);

  //First day of current month
  const firstDay = new Date(currentYear, currentMonth, 1);

  //Last day of current month
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();

  //Last day of last month
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();

  //Calculates the number of days from the next month that need to be displayed
  const nextDays = 7 - lastDayIndex - 1;

  // update current year and month in header
  month.innerText = `${months[currentMonth]}   ${currentYear}`;

  // to update days
  let days = '';

  // Previous month days
  for (let i = firstDay.getDay(); i > 0; i--) {
    days += `<div class="day prev">${prevLastDayDate - i + 1}</div>`;
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    // check if its today then add today class
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `<div class="day today">${i}</div>`;
    } else {
      //else dont add today
      days += `<div class="day ">${i}</div>`;
    }
  }

  // next Month days
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }

  // run this function with every calendar starts
  hideTodayBtn();
  daysContainer.innerHTML = days;
}

startCalendar();

// Click next button and change into next month
nextBtn.addEventListener('click', () => {
  // increase current month
  currentMonth++;
  // For next year
  if (currentMonth > 11) {
    // Reset month
    currentMonth = 0;
    currentYear++;
  }

  startCalendar();
});

// Click prev button and back to previous month
prevBtn.addEventListener('click', () => {
  // decrease current month
  currentMonth--;
  // For previous year
  if (currentMonth < 0) {
    // Reset month
    currentMonth = 11;
    currentYear--;
  }

  startCalendar();
});

// Jump back to today
todayBtn.addEventListener('click', () => {
  // set month and year to current
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();

  userYear.value = '';
  userMonth.value = '';

  startCalendar();
});

// Hide today button | shows only if go to next month or prev month
function hideTodayBtn() {
  if (
    currentMonth === new Date().getMonth() &&
    currentYear === new Date().getFullYear()
  ) {
    todayBtn.style.display = 'none';
  } else {
    todayBtn.style.display = 'flex';
  }
}

// Calculate user input year and month
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

  currentYear = year;
  currentMonth = month;

  startCalendar();
}
