$(document).ready(function () {
  // Fetch the JSON data from the file and function call
  $.getJSON('code.json', function (jsonData) {
    // body style
    $('body').attr('style', jsonData.body.style);
    // create html structure
    var $htmlStructure = createHtmlStructure(jsonData.body);
    // set the  structure to the body
    $('body').append($htmlStructure);
  });
});

/**
 *
 * @param {*} data Json data
 * @returns styled html structure
 */
function createHtmlStructure(data) {
  //   console.log(data);

  var $container;

  if (data.element) {
    // div ဘာညာ element ရှိလား ရှိတာနဲ့ တန်းပြီး create
    var $container = $('<' + data.element + '>');

    if (data.src) {
      // src img ရှိရင် src create
      $container.attr('src', data.src);
    }

    if (data.style) {
      // style ထည့်
      $container.attr('style', data.style);
    }

    if (data.text) {
      // text ရှိရင် create
      $container.text(data.text);
    }
  } else {
    // if nothing above, just create a div
    // element က null လို့မျိုး ဝင်လာရင် default div create
    $container = $('<div>');
  }

  // Child ဘယ်နှခုရှိလည်းစစ် ရှိသလောက် html create
  if (data.child && data.child.length > 0) {
    data.child.forEach(function (childData) {
      var $childElement = createHtmlStructure(childData);
      $container.append($childElement);
    });
  }

  return $container;
}
