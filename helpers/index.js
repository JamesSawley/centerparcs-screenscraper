const fs = require('fs');

module.exports = _quit = (i) => {
	const content = fs.readFileSync('config.json');
	const parseJson = JSON.parse(content);
	parseJson.config[i].skip = true;
	const json = JSON.stringify(parseJson);
	fs.writeFileSync('config.json', json);
}
