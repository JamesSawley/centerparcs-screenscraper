var page = require("webpage").create();

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

    page.evaluate(function() {
      /** Page 1 **/
      /** Field 1 - Location - Radio **/
      console.log('Getting location... ')
      var location = document.getElementById("woburnForest");

      location.click();

      if(location.checked) {
        console.log(location.value + " checked");
      }

      /** Field 2 - Duration - Radio **/
      console.log('Getting duration... ')
      var duration = document.getElementById("midweekID");

      duration.click();

      if(duration.checked) {
        console.log(duration.value + " checked");
      }

      /** Field 3 - Month - Dropdown **/
      console.log('Getting month... ')
      var month = document.getElementById("dd_selectMonth");

      month.value = "01 2018";

      if(month.text = "January 2018") {
        console.log(month.text + " selected");
      }

      /** Field 4 - Date - Dropdown **/
      console.log('Getting date... ')
      var date = document.getElementById("dd_selectDate");

      date.value = "29";

      if(date.text = "29th Monday") {
        console.log(date.text + " selected");
      }
    });

    page.render('images/page1_2.png');

    page.evaluate(function() {
      /** Field 5 - Submit page 1 - Button **/
      var button = document.getElementById("whereWhenFormImageSubmit");
      button.click();
      console.log('Submitting page 1... ')
    });

    setTimeout(function() {
      /** Page 2 **/
      console.log("----------------------------")
      console.log('Page 2 loaded ')
      page.render('images/page2_1.png');

      page.evaluate(function() {
        console.log('Getting number of adults... ')
        var numAdults = document.getElementById("numberAdults1");
        numAdults.value = "4";
        console.log(numAdults.value + ' adults')

        var rooms = Math.ceil(numAdults.value / 2);
        console.log(rooms + " rooms required");
        var numRooms = document.getElementById("numberBedrooms1");
        numRooms.value = rooms;

      });

      page.render('images/page2_2.png');

      page.evaluate(function() {
        /** Field 2 - Submit page 2 - Button **/
        var button = document.getElementById("submitFormImage");
        button.click();
        console.log('Submitting page 2... ')
      });

      setTimeout(function() {
        /** Page 3 **/
        console.log("----------------------------")
        console.log('Page 3 loaded ')
        page.render('images/page3_1.png');

        page.evaluate(function() {
          /** Get price **/
          var currentPrice = document.querySelectorAll(".availCell.requested")[0]
            .childNodes[1]
            .childNodes[1]
            .childNodes[1]
            .innerText.substr(1);
          console.log("The current price is £" + currentPrice);
        });
      }, 10000);
    }, 5000);
  }
  setTimeout(function() {
    console.log("----------------------------")
    console.log("Timed out. Exiting phantomjs")
    phantom.exit();
  }, 20000);
});
