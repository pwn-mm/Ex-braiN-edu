$(document).ready(function () {
  // Hide the cart initially
  $('.cart').hide();
  $('#discounttitle').hide();

  var selectedItemValue, itemName, itemCode, grandTotal;
  var selectedDeliveryValue = 0;
  var isCartEmpty = false;
  var selectedItems = [];

  //   Show card function
  let showCart = () => {
    // If user selects card, slide it in, slide out if there is not item left in the cart
    if (!isCartEmpty) {
      $('.cart').slideDown('slow');
      cartOpen = true;
    }
  };

  // Calculate grand total value
  let calculateGrandTotalValue = () => {
    grandTotal =
      selectedItems?.reduce(function (acc, value) {
        return acc + value;
      }, 0) + selectedDeliveryValue;
    console.log(grandTotal);

    // Update the grand total display
    $('#grand').text(grandTotal + ' Ks');
  };

  // Calculate user selected card's value
  let getUserSelectedCardValues = (clickedItem) => {
    itemName = clickedItem.find('.pname').text();
    itemCode = clickedItem.find('.code').text();
    selectedItemValue = parseFloat(
      clickedItem.find('.price').text().replace('Ks ', '')
    );
    selectedItems.push(selectedItemValue);
    return selectedItemValue;
    // console.log(selectedItemValue);
  };

  // Show the cart when user clicks any card
  $('.products').on('click', '.card', function () {
    showCart();
    // Calculate the selected item's value
    getUserSelectedCardValues($(this));

    // selectedItems.push({
    //   name: itemName,
    //   code: itemCode,
    //   price: selectedItemValue,
    // });

    // Create and append a new userCalculateItem element
    var newUserItem = $('<div class="userCalculateItem">');
    newUserItem.append(
      '<img src="' +
        $(this).find('img').attr('src') +
        '" alt="shirt" width="70px" />'
    );
    newUserItem.append(
      '<div><p>' + itemName + '</p><p>' + itemCode + '</p></div>'
    );
    newUserItem.append('<input type="text" name="item" id="item" />');
    newUserItem.append('<p><ion-icon name="trash"></ion-icon></p>');

    $('.calculateitem').append(newUserItem);

    // Detect change in delivery values and update
    $('#delivery').change(function () {
      selectedDeliveryValue = parseFloat($(this).val());

      // Recalculate the grand total
      calculateGrandTotalValue();
    });

    // Get the initial selected delivery option value
    selectedDeliveryValue = parseFloat($('#delivery').val());

    // Calculate the grand total initially
    calculateGrandTotalValue();
  });
});
