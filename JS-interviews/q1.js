//Test Case 1
let allexam = [
  [{ classid: 1, rank: 3 }],
  [{ classid: 1, rank: 5 }],
  [{ classid: 2, rank: 1 }],
  [{ classid: 2, rank: 6 }],
  [{ error: 'A', classid: 2, rank: 6 }],
  [{ classid: 3, rank: 1 }],
  [{ classid: 'A', rank: 1 }],
  [{ classid: 'A', rank: 1 }],
  [{ classid: 'a', rank: 1 }],
];

let allexam2 = null;

//Expected Output
[
  [
    { classid: 1, rank: 3 },
    { classid: 1, rank: 5 },
  ],
  [
    { classid: 2, rank: 1 },
    { classid: 2, rank: 6 },
  ],
  [{ classid: 3, rank: 1 }],
];

//TestCase 2
let allexam1 = [
  [{ classid: 1, rank: 3 }],
  [{ classid: 2, rank: 1 }],
  [{ classid: 3, rank: 1 }],
  [{ classid: 3, rank: 3 }],
  [{ classid: 3, rank: 2 }],
];

// funcition
//Expected Output
[
  [{ classid: 1, rank: 3 }],
  [{ classid: 2, rank: 1 }],
  [
    { classid: 3, rank: 1 },
    { classid: 3, rank: 3 },
    { classid: 3, rank: 2 },
  ],
];

let groupedArrayData = [];
let currentGroup = [];
let currentClassID = null;

/**
 *
 * @param {*} param is used to accept any kinds of array
 */
function groupArray(param) {
  for (let i = 0; i < param?.length; i++) {
    //တစ်ခန်းစီထုတ်ပြီး ထည့်ထား
    let eachExam = param[i][0];

    // group လုပ်ထားတာမရှိရင် or လက်ရှိ group ထဲက id နဲ့ exam ထဲက id နဲ့တူရင် စုမယ်
    if (
      currentGroup.length == 0 ||
      currentGroup[0].classid == eachExam.classid
    ) {
      // Group အသစ်ထဲထည့်တယ်
      currentGroup.push(eachExam);
    } else {
      // id မတူတဲ့ new array ကိုတွေ့တာ
      groupedArrayData.push(currentGroup);
      // group အသစ်စမယ်
      currentGroup = [];
      currentGroup.push(eachExam);
    }
  }

  // နောက်ဆုံးအကုန်ပြီးတာတောင် group ထဲမှာ data ကျန်သေးတယ်ဆိုရင် groupedArrayData ထဲထည့်ပေးလိုက်မယ်
  if (currentGroup.length > 0) {
    groupedArrayData.push(currentGroup);
  }

  console.log(groupedArrayData);
}

groupArray(allexam2);
