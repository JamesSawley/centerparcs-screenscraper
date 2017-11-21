let phantom = require('phantom');
let cheerio = require('cheerio');

let url = 'https://www.centerparcs.co.uk/breaks-we-offer/search.html/2/WO/29-01-2018/4/-/0/4/0/0/0/0/N';

let sitepage = null;
let phInstance = null;
phantom.create()
	.then(instance => {
    phInstance = instance;
    return instance.createPage();
	})
	.then(page => {
		_page = page;
		return _page.open(url);
	})
	.then(status => {
		console.log(status);
	})
	.then(() => {
		return setTimeout(function(){
			//wait 10 seconds
			let content = _page.property('content');
			let $ = cheerio.load(content);
			console.log(
				$('[data-accommodationcode="WL2"]')
			)
		}, 10000)
	})
	.catch(error => {
	  console.log(error);
	  phInstance.exit();
	});
