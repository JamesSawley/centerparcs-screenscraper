const scrape = require('./scrape');
const json = require('./config.json');
const schedule = require('node-schedule');
const notifier = require('node-notifier');
const fs = require('fs');

var rule = new schedule.RecurrenceRule();

switch(process.argv[2]) {
	case 'hour':
		rule.minute = [0];
		break;
	case 'quarter':
		rule.minute = [0, 15, 30, 45];
		break;
	case 'five':
		rule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
		break;
	case 'minute':
		rule.minute = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59];
		break;
	default:
    	rule.minute = [0];
}

let config = json.config;

var j = schedule.scheduleJob(rule, function(){
	json.config.map((el, index) => {
		(async (el, i) => {
			await scrape(i);
			config = JSON.parse(fs.readFileSync('config.json')).config;
			if (!config[i].skip &&
				config[i].currentPrice < config[i].pricePaid) {
				await console.log(`${i + 1}: ... sending notification`)
				await notifier.notify({
					title: 'Centerparcs lodge price change',
					message: `It's now only £${config[i].currentPrice}. Check out the minimised terminal for details.`
				});
				await console.log('done.')
			}
		})(el, index).catch(console.log.bind(console));
	});
});
