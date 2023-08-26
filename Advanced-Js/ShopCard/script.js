let cardData = document.getElementById('card-data');

const products = [
  {
    pName: 'Addicolor 3-Stripes',
    pDes: "Women's Originals",
    pGender: 1,
    pColor: ['#23ef45', '#000000', '#ff0000'],
    pCategory: 'Sales',
    pPrice: 30000,
    pDiscount: 100,
    pRate: 5,
    pCode: 'M102',
    pLsize: false,
    pMsize: false,
    pSsize: false,
    pStock: 0,
    pPhoto: 'M101.jpg',
  },
  {
    pName: 'Fresh Stretch Oxford Shirt',
    pDes: "Men's Fresh Stretch Oxford Shirt",
    pGender: 2,
    pColor: ['#060047', '#B3005E', '#FF5F9E'],
    pCategory: 'New',
    pPrice: 100000,
    pDiscount: 2,
    pRate: 3.8,
    pCode: 'M102',
    pLsize: true,
    pMsize: false,
    pSsize: true,
    pStock: 14,
    pPhoto: 'M102.jpg',
  },
  {
    pName: 'Printed Tee',
    pDes: "Women's Altitude Printed Tee",
    pGender: 1,
    pColor: ['#C0EEE4', '#FFCAC8'],
    pCategory: 'Popular',
    pPrice: 25000,
    pDiscount: 7,
    pRate: 5,
    pCode: 'M103',
    pLsize: false,
    pMsize: false,
    pSsize: true,
    pStock: 20,
    pPhoto: 'M103.jpg',
  },
  {
    pName: 'BASKETBALL TREFOIL JEEY',
    pDes: "Men's BASKETBALL TREFOIL JERSEY",
    pGender: 2,
    pColor: ['#2192FF', '#9CFF2E', '#FDFF00', '#38E54D'],
    pCategory: 'Sale',
    pPrice: 40000,
    pDiscount: 20,
    pRate: 2.8,
    pCode: 'M104',
    pLsize: false,
    pMsize: true,
    pSsize: false,
    pStock: 5,
    pPhoto: 'M104.jpg',
  },
];

for (const product of products) {
  let gender = product.pGender === 1 ? 'M' : product.pGender === 2 ? 'F' : null;

  let rating =
    product.pRate !== null && product.pRate >= 0 ? product.pRate : null;

  let lgSize = product.pLsize == true ? 'active ' : 'inactive';
  let mSize = product.pMsize == true ? 'active ' : 'inactive';
  let smSize = product.pSsize == true ? 'active ' : 'inactive';

  let coloredButton = product.pColor
    ?.map((color) => `<button style="background-color: ${color};"></button>`)
    .join('');

  if (
    gender == null ||
    rating == null ||
    product.pName == '' ||
    product.pName == null ||
    product.pDes == '' ||
    product.pDes == null ||
    product.pCategory == '' ||
    product.pCategory == null ||
    product.pPrice == '' ||
    product.pPrice == null ||
    product.pDiscount == null ||
    product.pPhoto == '' ||
    product.pPhoto == null ||
    product.pColor == '' ||
    product.pColor == null ||
    product.pStock == null
  ) {
    continue; // Won't show product
  }
  let commaPrice = product.pPrice.toLocaleString();
  let discountPrice =
    product.pPrice - product.pPrice * (product.pDiscount / 100);

  let stockLeft =
    product.pStock > 0 ? `${product.pStock} left` : 'Out of stock';

  cardData.innerHTML += `
    <div class="card">
    <div class="card-img">
      <img src="./img/${product.pPhoto}" alt="img1" width="230px" />
    </div>
    <div class="details">
      <div class="gender">${gender}</div>
      <div class="details-title">
        <h3>${product.pName}</h3>
        <p>${product.pDes}</p>
      </div>
      <div class="details-btn">
        <button>${product.pCategory}</button>
      </div>
      <div class="rating">
        <div><img src="./img/Star.png" alt="star" width="23px" /></div>
        <span>${rating}</span>
      </div>
    </div>
    <div class="choice">
      <div class="color">
        ${coloredButton}
      </div>
      <div class="size">
        <span class=${lgSize}>L</span>
        <span class=${mSize}>M</span>
        <span class=${smSize}>S</span></div>
      <div class="left-item">
        <p>${stockLeft}</p>
      </div>
    </div>
    <div class="price">
      <p>${commaPrice} MMK</p>
      <p>${discountPrice} MMK</p>
      <p>(${product.pDiscount}% off)</p>
    </div>
  </div>
    `;
}
