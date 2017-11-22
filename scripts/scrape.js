const puppeteer = require('puppeteer');
const config = require('../config.json').config;
const fs = require('fs');

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
(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
	console.log('... loading page');
  await page.goto(url, {timeout: 60000});
	console.log('... page loaded');
	console.log('... waiting for selector');
	await page.waitFor('[data-accommodationcode="WL2"]');
	console.log('... taking screenshot 2');
  await page.screenshot({path: 'images/page-load-2.png'});
	console.log('... finding price');
	const price = await page.evaluate(() => {
		const el = document.querySelector('[data-accommodationcode="WL2"]').getAttribute('data-price');
		return el;
	})
	console.log('Current Price: £' + price);

	await page.close();
  await browser.close();

	console.log('');
	console.log('-------- Section 3 - Write to config --------');
	console.log("... writing to file");
	const content = fs.readFileSync('config.json');
  const parseJson = JSON.parse(content);
  parseJson.config.currentPrice = +price;
  const json = JSON.stringify(parseJson);
	fs.writeFileSync('config.json', json);
	console.log('... done');

})();
