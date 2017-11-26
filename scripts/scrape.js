const puppeteer = require('puppeteer');
const json = require('../config.json');
const fs = require('fs');
const _quit = require('../helpers')

let config = json.config;
let skip = false;

module.exports = scrape = (async () => {
	process.on('unhandledRejection', (reason, p) => {
	  console.log('Unhandled Rejection at:', p, 'reason:', reason);
	});

	console.log('');
	console.log('-------- Section 1 - Construct URL --------');
	/* Loading the centerparcs search URL. Description on search terms below
	** https://www.centerparcs.co.uk/breaks-we-offer/search.html/2/WO/29-01-2018/4/-/0/4/0/0/0/0/N
	** 2/						???
	** WF/					Forest
	** 29-01-2018/	Start Date
	** 4/						Number of nights
	** -/						???
	** 0/						???
	** 4/						Adults
	** 0/						Children 6-16
	** 0/						Children 2-5
	** 0/						Children 0-2
	** 0/						Number of dogs
	** N						Accessible Y/N    */
	const url = 'https://www.centerparcs.co.uk/breaks-we-offer/search.html/2'
		+ '/' + config.location
		+ '/' + config.date
		+ '/' + config.nights
		+ '/' + '-'
		+ '/' + 0
		+ '/' + config.adults
		+ '/' + config.children
		+ '/' + config.toddlers
		+ '/' + config.infants
		+ '/' + config.dogs
		+ '/' + config.accessible;
	console.log('... ' + url + ' constructed');

	console.log('');
	console.log('-------- Section 2 - Load Chromium --------');
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

	console.log('... loading page');
	try {
		await page.goto(url);
	} catch(err) {
		console.log("(1) Error loading page. Please try again later." );
		_quit();
		await page.close();
	  await browser.close();
		return;
	}
	console.log('... page loaded');

	console.log('... waiting for selector');
	try {
		await page.waitFor('[data-accommodationcode="' + config.lodge + '"]');
	} catch(err) {
		console.log("(2) Error finding accomodation. It's likely that you have inputted the wrong search criteria. Please check and try again. If this problem persists then there are no available lodges." );
		_quit();
		await page.close();
	  await browser.close();
		return;
	}

	console.log('... finding price');
	const price = await page.evaluate((config) => {
		const el = document.querySelector('[data-accommodationcode="' + config.lodge + '"]').getAttribute('data-price');
		return el;
	}, config)
	console.log('Current Price: £' + price);

	await page.close();
  await browser.close();

	console.log('');
	console.log('-------- Section 3 - Write to config --------');
	console.log("... writing to file");
	try {
		const content = fs.readFileSync('config.json');
	  const parseJson = JSON.parse(content);
	  parseJson.config.currentPrice = +price;
		parseJson.ui.skip = skip;
	  const json = JSON.stringify(parseJson);
		fs.writeFileSync('config.json', json);
	} catch(err) {
		console.log("(4) Error writing price to file. Please try again later." );
		_quit();
		return;
	}
	console.log('... done');
});
