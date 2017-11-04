var page = require("webpage").create();
page.open("http://reservations.centerparcs.co.uk/", function(status) {
	if(status !== "success") {
    console.log("Page load failed. Exiting phantomjs");
    phantom.exit();
	} else {
    console.log("Page loaded: " + page.title);

    var location = page.evaluate(function() {
      return document.getElementById("woburnForest");
    });
    console.log("location: " + location.value);
  }
  setTimeout(function() {
    phantom.exit();
  }, 5000);
});
