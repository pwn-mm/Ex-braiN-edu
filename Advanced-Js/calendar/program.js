let days = document.getElementsByClassName('days');
showCalendar();

// Show current month date
// အဲ့ လ သည် ဘယ်ရက်ကစလည်းဆိုတာ အရေးကြီးပါတယ်
function showCalendar() {
  const currentDate = new Date(2023, 3);

  currentDate.setDate(1); // Go to 1st day of the month
  let startDate = currentDate.getDay(); // 0 - 6
  let countDate = 1;

  // end of the month
  //နောက်လရဲ့ ပထမရက်ကိုသွား အဲ့ရက်ရဲ့ ရှေ့ရက်က ဒီလရဲ့ နောက်ဆုံးရက်
  currentDate.setMonth(currentDate.getMonth() + 1); // go to next month
  currentDate.setDate(0); // last date of current month
  let endDate = currentDate.getDate();

  // ဘယ်နှကွက်ကျော်ရမလည်းဆိုတာ စဥ်းစားလို့ရပြီ
  //   for (let i = 0; i < startDate; i++) {
  //     days[i].innerText = 'Empty'; // လွတ်မယ့်အကွက်အတွက်
  //   }

  for (let i = startDate; i < 35; i++) {
    if (countDate <= endDate) days[i].innerText = countDate++;
  }
}
