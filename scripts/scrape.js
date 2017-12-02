const puppeteer = require('puppeteer');
const json = require('../config.json');
const fs = require('fs');
const _quit = require('../helpers');

module.exports = scrape = (async (i) => {

	let config = json.config[i];
	let skip = false;

	process.on('unhandledRejection', (reason, p) => {
	  console.log('Unhandled Rejection at:', p, 'reason:', reason);
	});

	console.log('');
	console.log(`${i + 1}: -------- Section 1 - Construct URL --------`);
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
	console.log(`${i + 1}: ... ` + url + ' constructed');

	console.log('');
	console.log(`${i + 1}: -------- Section 2 - Load Chromium --------`);
  const browser = await puppeteer.launch({
  	args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

	console.log(`${i + 1}: ... loading page`);
	try {
		await page.goto(url);
	} catch(err) {
		console.log(`${i + 1}: (1) Error loading page. Please try again later.`);
		_quit(i);
		await page.close();
	  await browser.close();
		return;
	}
	console.log(`${i + 1}: ... page loaded`);

	console.log(`${i + 1}: ... waiting for selector`);
	try {
		await page.waitFor('[data-accommodationcode="' + config.lodge + '"]');
	} catch(err) {
		console.log(`${i + 1}: (2) Error finding accomodation. It's likely that you have inputted the wrong search criteria. Please check and try again. If this problem persists then there are no available lodges.`);
		_quit(i);
		await page.close();
	  await browser.close();
		return;
	}

	console.log(`${i + 1}: ... finding price`);
	const price = await page.evaluate((config) => {
		const el = document.querySelector('[data-accommodationcode="' + config.lodge + '"]').getAttribute('data-price');
		return el;
	}, config)
	console.log(`${i + 1}: Current Price: £` + price);

	await page.close();
  await browser.close();

	console.log('');
	console.log(`${i + 1}: -------- Section 3 - Write to config --------`);
	console.log(`${i + 1}: ... writing to file`);
	try {
		const content = fs.readFileSync('config.json');
	  const parseJson = JSON.parse(content);
	  parseJson.config[i].currentPrice = +price;
		parseJson.config[i].skip = skip;
	  const json = JSON.stringify(parseJson);
		await fs.writeFileSync('config.json', json);
	} catch(err) {
		console.log(`${i + 1}: (4) Error writing price to file. Please try again later.`);
		_quit(i);
		return;
	}
	console.log(`${i + 1}: ... done`);
});
