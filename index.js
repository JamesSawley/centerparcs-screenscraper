const scrape = require('./scripts/scrape');
const mail = require('./scripts/send_mail');
var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();
rule.minute = 0;

var j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
	(async () => {
		await scrape();
		await mail();
	})();
});
