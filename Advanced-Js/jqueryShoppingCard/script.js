$(document).ready(function () {
  const $cart = $('.cart');
  const $grandTotal = $('#grand');
  const $discountTitle = $('#discounttitle');
  const $discountPrice = $('#discountprice');
  const $products = $('.products');
  const $calculateItem = $('.calculateitem');
  const $delivery = $('#delivery');
  const $orderButton = $('#order');
  const $orderDetails = $('#orderdetail');
  const $userName = $('#yourname');
  const $userPhone = $('#phone');
  const $userAddr = $('#address');

  var selectedItemValue, itemName, itemCode, grandTotal, originalGrandTotal;
  var selectedDeliveryValue = 0;
  var isCartEmpty = false;
  var selectedItems = [];

  // Hide the cart initially
  $cart.hide();
  $discountTitle.hide();
  $discountPrice.hide();

  // Show card function
  const showCart = () => {
    // If user selects card, slide it in, slide out if there is not item left in the cart
    if (!isCartEmpty) {
      $cart.slideDown(2000);
      cartOpen = true;
    }
  };

  // Check if weekend function
  const checkIfWeekend = () => {
    const today = new Date();
    const daysOfWeek = today.getDay();
    // 0 for Sunday , 6 for Saturday
    return daysOfWeek == 0 || daysOfWeek == 6;
  };

  // GrandTotal calculation function
  const calculateGrandTotalValue = () => {
    // Calculate the total price of selected items without delivery fees
    const totalWithoutDelivery = selectedItems?.reduce(function (acc, item) {
      return acc + item.selectedItemValue * item.selectedQuantity;
    }, 0);

    // Calculate the discounted total based on the total without delivery fees
    const discountedTotal = checkIfWeekend()
      ? totalWithoutDelivery * 0.85
      : totalWithoutDelivery;

    if (checkIfWeekend()) {
      $discountTitle.show();
      $discountPrice.text(totalWithoutDelivery * 0.85 + ' Ks'); // Display the discount amount
      $discountPrice.show();
    }

    // Add the selected delivery fees to the discounted total
    grandTotal = discountedTotal + selectedDeliveryValue;

    // Update the grand total display
    $grandTotal.text(grandTotal + ' Ks');
  };

  /**
   * Calculate user selected card's value and push into selectedItems[]
   *
   * @param {*} clickedItem Get the user clicked card values
   * @returns selectedItem value
   */
  const getUserSelectedCardValues = (clickedItem) => {
    itemName = clickedItem.find('.pname').text();
    itemCode = clickedItem.find('.code').text();
    selectedItemValue = parseFloat(
      clickedItem.find('.price').text().replace('Ks ', '')
    );

    // Check if the item is already selected
    if (selectedItems.some((item) => item.itemCode === itemCode)) {
      // Show an alert if the item has already been selected
      alert('Item has already in the cart!');
      return null;
    }

    selectedItems.push({ itemCode, selectedItemValue, selectedQuantity: 1 });
    return selectedItemValue;
  };

  // Click Order Function
  const clickOrderButton = () => {
    $orderButton.click(function () {
      const name = $userName.val();
      const phone = $userPhone.val();
      const addr = $userAddr.val();

      const phoneRegex = /^[\+][0-9]{3}[-\s\.][0-9]{1,9}$/;

      if (!name || !addr) {
        alert('Please fill all necessary information.');
      } else if (!phoneRegex.test(phone)) {
        alert('Please enter a valid phone number.');
      } else {
        showUserDetails(name, phone, addr);
      }
    });
  };

  /**
   * Create user details html
   *
   * @param {*} name UserInput Name
   * @param {*} phone UserInput PhoneNum
   * @param {*} addr UserInput Address
   */
  const showUserDetails = (name, phone, addr) => {
    $orderDetails.html(`
      <span>Thank you ${name}</span>
      <span>We received your order.</span>
      <span>We will deliver to your place at ${addr}.</span>
      <span
        >Before delivery, we will inform to your Phone : ${phone}</span
      >
      `);
  };

  // User input ပြင်မယ့် item code နဲ့ ရှိပြီးသားထဲက item code နဲ့တူလားတိုက်စစ် / တူရင် selectedQuantity ကို update လုပ်
  const updateItemQuantity = (currentItemCode, quantity) => {
    const updateItem = selectedItems.find(
      (item) => item.itemCode == currentItemCode
    );
    if (updateItem) updateItem.selectedQuantity = quantity;
  };

  // Show the cart when user clicks any card
  // Show the cart when user clicks any card
  $products.on('click', '.card', function () {
    showCart();
    // Calculate the selected item's value
    var userSelectedItemValue = getUserSelectedCardValues($(this));

    if (userSelectedItemValue !== null) {
      // Create and append a new userCalculateItem element
      var newUserItem = $('<div class="userCalculateItem">');
      newUserItem.html(`
      <img src="${$(this).find('img').attr('src')}" alt="shirt" width="70px" />
      <div><p>${itemName}</p><p>${itemCode}</p></div>
      <input type="text" name="item" value="1" />
      <p><ion-icon name="trash"></ion-icon></p>
    `);

      // Get the current itemCode value for user input quantity
      var currentItemCode = itemCode;
      console.log(currentItemCode);

      $calculateItem.append(newUserItem);

      // 1 and 9 ကြားအတွင်းစစ်
      var previousQuantity = 1;

      // Detect changes in input box whether if the user changes the quantity
      newUserItem.on('change', 'input[name="item"]', function () {
        // Get the updated quantity and item code
        var updatedQuantity = parseInt($(this).val());
        console.log(updatedQuantity);

        if (
          updatedQuantity < 1 ||
          updatedQuantity > 9 ||
          isNaN(updatedQuantity)
        ) {
          alert('Please enter a quantity between 1 and 9.');
          // Item code တူတဲ့ကောင်ရဲ့ ပြောင်းလိုက်တဲ့ quantity ကိုရှာ
          $(this).val(
            selectedItems.find((item) => item.itemCode === currentItemCode)
              ?.selectedQuantity || 1
          );
        } else {
          // Update the quantity and item value
          updateItemQuantity(currentItemCode, updatedQuantity);
          // Recalculate the grand total
          calculateGrandTotalValue();
        }
      });

      // Detect change in delivery values and update
      $delivery.change(function () {
        selectedDeliveryValue = parseFloat($(this).val());

        // Recalculate the grand total
        calculateGrandTotalValue();
      });

      // Get the initial selected delivery option value
      selectedDeliveryValue = parseFloat($delivery.val());

      // Calculate the grand total initially
      calculateGrandTotalValue();
    }
  });

  // Place order buttion function
  clickOrderButton();
});
