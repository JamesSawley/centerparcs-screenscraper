let request = require('request');
let cheerio = require('cheerio');

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

let url = 'https://www.centerparcs.co.uk/breaks-we-offer/search.html/2/WO/29-01-2018/4/-/0/4/0/0/0/0/N';
request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {
		let $ = cheerio.load(html);

		let i = 0;
		while (i === 0) {
			if ($('[data-accommodationcode="WL2"]')[0] !== undefined) {
				i = 1;
			}
		}


		console.log(
			$('div.searchresults.aem-GridColumn.aem-GridColumn--default--12')
			.html()
		)

		// console.log(
		// 	$('[data-accommodationcode="WL2"]')[0].html()
		// )

		// console.log(
		// 	$('a.btn.btn--book.js-accommodation-from-search-book-now')
		// 		.children()
		// 		.html()
		// )
  }
});
















//     setTimeout(function() {
//       /** Page 3 **/
//       /** Wait 10 seconds **/
//       console.log("----------------------------")
//       console.log('Page 3 loaded ')
//       page.render('images/page3_1.png');
//
//       var currentPrice = page.evaluate(function() {
//         /** Get price **/
//         var currentPrice = document.querySelectorAll(".availCell.requested")[0]
//           .childNodes[1]
//           .childNodes[1]
//           .childNodes[1]
//           .innerText.substr(1);
//         return currentPrice
//       });
//
//       console.log("The current price is £" + currentPrice);
//
//       console.log("Writing to file...")
//       var content = fs.read('src/config.json');
//       var parseJson = JSON.parse(content);
//       parseJson.currentPrice = +currentPrice;
//       var json = JSON.stringify(parseJson);
//       fs.write('src/config.json', json, 'w');
//
//       console.log("----------------------------")
//       console.log("Finishing...")
//       console.log("Exiting phantomjs")
//       console.log("----------------------------")
//       phantom.exit();
//
//     }, 10000);
//   }, 5000);
// }
// 	};
//
// 	setTimeout(function() {
//     console.log("----------------------------")
//     console.log("Timed out. Exiting phantomjs")
//     phantom.exit();
//   }, 5000);
// });
//
// // try {
// //
// // }
// // catch(err) {
// //   console.log(err);
// // }
