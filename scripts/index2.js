var webPage = require('webpage');
var page = webPage.create();

var url = 'https://www.centerparcs.co.uk/breaks-we-offer/search.html/2/WO/29-01-2018/4/-/0/4/0/0/0/0/N';

page.open(url, function(status) {

	page.onConsoleMessage = function(msg) {
    console.log(msg);
  }

  if(status !== "success") {
    console.log("Page load failed. Exiting phantomjs");
    phantom.exit();
	} else {
    console.log("----------------------------")
    console.log("Page loaded: " + page.title);


			page.evaluate(function() {
				setTimeout(function() {
					console.log(document.querySelector('[data-accommodationcode="WL2"]'));
				}, 5000)
		  });
			phantom.exit();
	}
});
