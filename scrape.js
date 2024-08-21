const puppeteer = require('puppeteer');
const json = require('./config.json');
const fs = require('fs');

_quit = (async (i) => {
	const content = fs.readFileSync('config.json');
	const parseJson = await JSON.parse(content);
	parseJson.config[i].skip = true;
	const json = await JSON.stringify(parseJson);
	fs.writeFileSync('config.json', json);
});

module.exports = scrape = (async (i) => {

	let config = json.config[i];
	let skip = false;

	process.on('unhandledRejection', (reason, p) => {
		console.log('Unhandled Rejection at:', p, 'reason:', reason);
	});

	/* Loading the centerparcs search URL. Description on search terms below
	** https://www.centerparcs.co.uk/breaks-we-offer/search.html/2/LF/03-03-2025/4/-/-/3/5/0/0/1/0/N
	** 2/						???
	** WF/					Forest
	** 29-01-2018/	Start Date
	** 4/						Number of nights
	** -/						???
	** -/						???
	** 3/						Number of bedrooms
	** 4/						Adults
	** 0/						Children 6-16
	** 0/						Children 2-5
	** 0/						Children 0-2
	** 0/						Number of dogs
	** N						Accessible Y/N    */
	const url = 'https://www.centerparcs.co.uk/breaks-we-offer/search.html/2' + '/' + config.location + '/' + config.date + '/' + config.nights + '/-/-/' + config.numberOfBedrooms + '/' + config.adults + '/' + config.children + '/' + config.toddlers + '/' + config.infants + '/' + config.dogs + '/' + config.accessible;
	console.log(`${i + 1}: Loading browser... ${url}`);
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
		headless: true
	});
	const page = await browser.newPage();

	console.log(`${i + 1}: ... loading page`);
	try {
		await page.goto(url);
	} catch (err) {
		console.log(`${i + 1}: Error loading page. Please try again later.`);
		await _quit(i);
		await page.close();
		await browser.close();
		return;
	}

	try {
		// Dismiss cookie handler if required
		await page
			.locator('#onetrust-accept-btn-handler')
			.setTimeout(3000)
			.click()
	} catch {}

	console.log(`${i + 1}: ... waiting for selector`);
	try {
		await page.locator('[data-accommodationcode="' + config.lodge + '"]').waitHandle();
	} catch (err) {
		console.log(`${i + 1}: Error finding accomodation. It's likely that you have inputted the wrong search criteria. Please check and try again. If this problem persists then there are no available lodges.`);
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

	console.log(`${i + 1}: ... writing to file`);
	try {
		const content = fs.readFileSync('config.json');
		const parseJson = JSON.parse(content);
		parseJson.config[i].currentPrice = + price;
		parseJson.config[i].skip = skip;
		const json = JSON.stringify(parseJson, null, 2);
		await fs.writeFileSync('config.json', json);
	} catch (err) {
		console.log(`${i + 1}: Error writing price to file. Please try again later.`);
		_quit(i);
		return;
	}

	await console.log(`${i + 1}: ... shutting down browser`)
	await page.close();
	await browser.close();
});
