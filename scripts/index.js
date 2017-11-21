const puppeteer = require('puppeteer');

/* Loading the centerparcs search URL. Description on search terms below
** https://www.centerparcs.co.uk/breaks-we-offer/search.html/2/WO/29-01-2018/4/-/0/4/0/0/0/0/N
** 2/						???
** WF/					Forest
** 29-01-2018/	Start Date
** 4/						Number of nights
** -/
** 0/						???
** 4/						Adults
** 0/						Children 6-16
** 0/						Children 2-5
** 0/						Children 0-2
** 0/						Number of dogs
** N						Accessible Y/N    */

const url = 'https://www.centerparcs.co.uk/breaks-we-offer/search.html/2/WO/29-01-2018/4/-/0/4/0/0/0/0/N';

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

	/* Section 1 - Get page dimensions
	** 1) Load Page
	** 2) Get dimensions from chromium
	** 3) Take screenshot */
	console.log('-------- Section 1 --------')
  await page.goto(url, {timeout: 60000});
	console.log('... page loaded')
	const dimensions = await page.evaluate(() => {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight,
      deviceScaleFactor: window.devicePixelRatio
    };
  });
	console.log('... got dimensions')
  await page.screenshot({path: 'images/page-load-1.png'});
	console.log('... screenshot 1 taken');

	/* Section 2 - Load and evaluate page
	** 1) Set viewport dimensions
	** 2) Set page to wait for waitForSelector
	** 3) Load page
	** 4) Take screenshot
	** 5) Get current price  */
	console.log('-------- Section 2 --------')
	await page.setViewport(dimensions);
	console.log('... set viewport dimensions')
	page
    .waitForSelector('[data-accommodationcode="WL2"]', { visible: true })
    .then(() => console.log('... waiting for selector'));
  // await page.goto(url, {timeout: 60000});
	// console.log('... loaded page')
  await page.screenshot({path: 'images/page-load-2.png'});
	console.log('... screenshot 2 taken');
	const price = await page.evaluate(() => {
		const el = document.querySelector('[data-accommodationcode="WL2"]').getAttribute('data-price');
		return el;
	})
	console.log('Current Price: £' + price);

	await page.close()
  await browser.close();
})();
