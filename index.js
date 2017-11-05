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
      console.log('Getting location... ')
      var location = document.getElementById("woburnForest");

      console.log("Clicking " + location.value);
      location.click();

      if(location.checked) {
        console.log(location.value + " checked");
      }
    });
  }

  setTimeout(function() {
    console.log("Timed out. Exiting phantomjs")
    phantom.exit();
  }, 5000);
});
