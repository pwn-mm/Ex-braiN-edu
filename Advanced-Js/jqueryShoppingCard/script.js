$(document).ready(function () {
  const $cart = $('.cart');
  const $grandTotal = $('#grand');
  const $discountTitle = $('#discounttitle');
  const $products = $('.products');
  const $calculateItem = $('.calculateitem');
  const $delivery = $('#delivery');

  var selectedItemValue, itemName, itemCode, grandTotal;
  var selectedDeliveryValue = 0;
  var isCartEmpty = false;
  var selectedItems = [];

  // Hide the cart initially
  $cart.hide();
  $discountTitle.hide();

  //   Show card function
  let showCart = () => {
    // If user selects card, slide it in, slide out if there is not item left in the cart
    if (!isCartEmpty) {
      $cart.slideDown('slow');
      cartOpen = true;
    }
  };

  // Calculate grand total value
  let calculateGrandTotalValue = () => {
    grandTotal =
      selectedItems?.reduce(function (acc, item) {
        console.log(item);
        return acc + item.selectedItemValue * item.selectedQuantity;
      }, 0) + selectedDeliveryValue;
    console.log(grandTotal);

    // Update the grand total display
    $grandTotal.text(grandTotal + ' Ks');
  };

  // Calculate user selected card's value
  let getUserSelectedCardValues = (clickedItem) => {
    itemName = clickedItem.find('.pname').text();
    itemCode = clickedItem.find('.code').text();
    selectedItemValue = parseFloat(
      clickedItem.find('.price').text().replace('Ks ', '')
    );

    // Check if the item is already selected
    if (selectedItems.some((item) => item.itemCode === itemCode)) {
      // Show an alert if the item has already been selected
      alert('You have already selected this item.');
      return null;
    }

    selectedItems.push({ itemCode, selectedItemValue, selectedQuantity: 1 });
    return selectedItemValue;
    // console.log(selectedItemValue);
  };

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
      $calculateItem.on('change', 'input[name="item"]', function () {
        // Get the updated quantity and item code
        var updatedQuantity = parseInt($(this).val());
        console.log(updatedQuantity);

        if (updatedQuantity < 1 || updatedQuantity > 9) {
          alert('Please enter a quantity between 1 and 9.');
          $(this).val(previousQuantity);
        } else {
          // Update the quantity and item value
          // User input ပြင်မယ့် item code နဲ့ ရှိပြီးသားထဲက item code နဲ့တူလားတိုက်စစ် / တူရင် selectedQuantity ကို update လုပ်
          selectedItems.forEach(function (item) {
            if (item.itemCode == currentItemCode) {
              item.selectedQuantity = updatedQuantity;
              previousQuantity = updatedQuantity;
            }
          });
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
});
