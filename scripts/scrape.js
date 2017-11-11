var page = require("webpage").create();
var config = require('../src/config.json');
var fs = require('fs');

var selection = config.selection;

page.open("http://reservations.centerparcs.co.uk/", function(status) {

  page.onConsoleMessage = function(msg) {
    console.log(msg);
  }

  if(status !== "success") {
    console.log("Page load failed. Exiting phantomjs");
    phantom.exit();
	} else {
    console.log("----------------------------")
    console.log("Page loaded: " + page.title);

    page.render('images/page1_1.png');

    page.evaluate(function(selection) {
      /** Page 1 **/
      /** Field 1 - Location - Radio **/
      console.log('Getting location... ')
      var location = document.getElementById(selection.location);
      location.click();

      /** Field 2 - Duration - Radio **/
      console.log('Getting duration... ')
      var duration = document.getElementById(selection.duration);
      duration.click();

      /** Field 3 - Month - Dropdown **/
      console.log('Getting month... ')
      var month = document.getElementById("dd_selectMonth");
      month.value = selection.month;


      /** Field 4 - Date - Dropdown **/
      console.log('Getting date... ')
      var date = document.getElementById("dd_selectDate");
      date.value = selection.day;

    }, selection);

    page.render('images/page1_2.png');

    page.evaluate(function() {
      /** Field 5 - Submit page 1 - Button **/
      var button = document.getElementById("whereWhenFormImageSubmit");
      button.click();
      console.log('Submitting page 1... ')
    });

    setTimeout(function() {
      /** Page 2 **/
      /** Wait 5 seconds **/
      console.log("----------------------------")
      console.log('Page 2 loaded ')
      page.render('images/page2_1.png');

      page.evaluate(function(selection) {
        console.log('Getting number of adults... ')
        var numAdults = document.getElementById("numberAdults1");
        numAdults.value = selection.numAdults;

        var rooms = Math.ceil(numAdults.value / 2);
        console.log(rooms + " rooms required");
        var numRooms = document.getElementById("numberBedrooms1");
        numRooms.value = rooms;

      }, selection);

      page.render('images/page2_2.png');

      page.evaluate(function() {
        /** Field 2 - Submit page 2 - Button **/
        var button = document.getElementById("submitFormImage");
        button.click();
        console.log('Submitting page 2... ')
      });

      setTimeout(function() {
        /** Page 3 **/
        /** Wait 10 seconds **/
        console.log("----------------------------")
        console.log('Page 3 loaded ')
        page.render('images/page3_1.png');

        var currentPrice = page.evaluate(function() {
          /** Get price **/
          var currentPrice = document.querySelectorAll(".availCell.requested")[0]
            .childNodes[1]
            .childNodes[1]
            .childNodes[1]
            .innerText.substr(1);
          return currentPrice
        });

        console.log("The current price is £" + currentPrice);

        console.log("Writing to file...")
        var content = fs.read('src/config.json');
        var parseJson = JSON.parse(content);
        parseJson.currentPrice = +currentPrice;
        var json = JSON.stringify(parseJson);
        fs.write('src/config.json', json, 'w');

        console.log("----------------------------")
        console.log("Finishing...")
        console.log("Exiting phantomjs")
        console.log("----------------------------")
        phantom.exit();

      }, 10000);
    }, 5000);
  }
  setTimeout(function() {
    console.log("----------------------------")
    console.log("Timed out. Exiting phantomjs")
    phantom.exit();
  }, 20000);
});

// try {
//
// }
// catch(err) {
//   console.log(err);
// }
