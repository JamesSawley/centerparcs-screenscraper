var page = require("webpage").create();
page.open("http://reservations.centerparcs.co.uk/", function(status) {

  page.onConsoleMessage = function(msg) {
    console.log(msg);
  }

  if(status !== "success") {
    console.log("Page load failed. Exiting phantomjs");
    phantom.exit();
	} else {
    console.log("Page loaded: " + page.title);

    page.evaluate(function() {
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

    console.log("----------------------------------");
    console.log("Script complete. Exiting phantomjs");
    phantom.exit();
  }
  setTimeout(function() {
    console.log("Timed out. Exiting phantomjs")
    phantom.exit();
  }, 5000);
});
