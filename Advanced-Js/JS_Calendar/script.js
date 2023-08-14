const daysContainer = document.querySelector('.days');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const month = document.querySelector('.month');
const todayBtn = document.querySelector('.today-btn');
const userYear = document.getElementById('year');
const userMonth = document.getElementById('month');
const holiday = document.getElementById('holiday');
const holidayName = document.getElementById('holidayName');

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

// Array to store holiday dates
// const holidayDates = new Set();

// Arrays to store holiday dates
const holidayDates = [];
const holidayNames = [];

let selectedYear;
let selectedMonth;
let selectedDay;

function startCalendar() {
  // Get previous month, current month and next month days
  date.setDate(1);

  //First day of current month
  const firstDay = new Date(currentYear, currentMonth);
  firstDay.setDate(1);

  //Last day of current month
  const lastDay = new Date(currentYear, currentMonth + 1); // Go to next month
  lastDay.setDate(0); // Last day of current month
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();

  //Last day of last month
  const prevLastDay = new Date(currentYear, currentMonth); // Current month
  // prevLastDay.setDate(0);
  prevLastDay.setDate(1); // First day of current month
  prevLastDay.setHours(-1); // Last day of last month
  const prevLastDayDate = prevLastDay.getDate();

  //Calculates the number of days from the next month that need to be displayed
  // ၇ ထဲကနေ နောက်ဆုံးရက်ရှိတဲ့ index ကိုနှုတ် / 0 က စတာမို့လို့ -1 ထပ်နှုတ်
  // ၃နေရာ ရှိတယ်ဆိုရင် တကယ်ယူမှာက 0 1 2 3 ဆိုတော့ ၄နေရာဖြစ်တယ် အဲ့တာကြောင့် ၁ နှုတ်
  const nextDays = 7 - lastDayIndex - 1;
  // console.log(nextDays);

  // update current year and month in header
  month.innerText = `${months[currentMonth]}   ${currentYear}`;

  // to update days
  let days = '';

  // Previous month days

  // "i" represents the number of days before the first day of the current month
  for (let i = firstDay.getDay(); i > 0; i--) {
    /**
     * prevLastDayDate - i
     * the difference between the date of the last day of the previous month and the current loop index i.
     */
    days += `<div class="day prev">${prevLastDayDate - i + 1}</div>`;
  }

  // current month days
  for (let i = 1; i <= lastDayDate; i++) {
    const dateId = `${currentYear}-${currentMonth}-${i}`;
    // const isHoliday = holidayDates.has(dateId);
    const isHoliday = holidayDates.includes(dateId);
    // console.log(isHoliday);
    let userHolidayName = '';

    // Find the corresponding holiday name for the current dateId
    for (let j = 0; j < holidayNames.length; j++) {
      if (holidayNames[j].dateId == dateId) {
        userHolidayName = holidayNames[j].name;
        break;
      }
    }

    // check if its today then add today class
    if (isHoliday) {
      days += `<div id=${dateId} class="day red">${i}<span class="name">${userHolidayName}</span></div>`;
    } else if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      // if date month year matches add today
      days += `<div id=${dateId} class="day today">${i}</div>`;
    } else {
      //else dont add today
      days += `<div id=${dateId} class="day ">${i}</div>`;
    }

    holiday.value = '';
    holidayName.value = '';
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
  holiday.value = '';
  holidayName.value = '';

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

  if (
    isNaN(month) ||
    month < 0 ||
    month > 11 ||
    isNaN(year) ||
    isYearFourDigit(year) == false
  ) {
    alert('Please enter a valid month (1 - 12) and valid year number.');
    userYear.value = '';
    userMonth.value = '';
    return;
  }

  currentYear = year;
  currentMonth = month;

  startCalendar();
}

// Check if the year is 4 digits or not
function isYearFourDigit(year) {
  const yearString = year.toString();
  return /^\d{4}$/.test(yearString);
}

function addHoliday() {
  let holidayDate = new Date(holiday.value);
  let name = holidayName.value;
  if (holiday.value && name) {
    const dateId = `${holidayDate.getFullYear()}-${holidayDate.getMonth()}-${holidayDate.getDate()}`;

    // Add the selected date to the holidayDates set
    // holidayDates.add(dateId);

    // if there is no holiday name with this id, add to array
    if (!holidayDates.includes(dateId)) {
      holidayDates.push(dateId);

      if (name.length > 12) {
        name = name.slice(0, 12) + '...';
      }
      holidayNames.push({ dateId: dateId, name: name });
      // Refresh the calendar to apply the holiday style
      startCalendar();
    } else {
      alert('Date is already a holiday.');
      holiday.value = '';
      holidayName.value = '';
    }
  } else {
    alert('Must enter both date and note!');
  }
}
