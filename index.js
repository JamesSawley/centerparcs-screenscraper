const scrape = require('./scripts/scrape');
const mail = require('./scripts/send_mail');
// var schedule = require('node-schedule');
//
// var rule = new schedule.RecurrenceRule();
// rule.minute = 0;
//
// var j = schedule.scheduleJob(rule, function(){
	(async () => {
		await scrape();
		await mail();
	})();
// });
