var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://www.centerparcs.co.uk/villages/woburn/index.jsp";

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body),
      title = $('[itemprop=name]').html();

    console.log("Well done, you've found " + title);
  } else {
    console.log("Uh oh! Error: " + error);
  }
});
