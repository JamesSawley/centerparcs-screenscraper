const fs = require('fs');

module.exports = _quit = () => {
	const content = fs.readFileSync('config.json');
	const parseJson = JSON.parse(content);
	parseJson.ui.skip = true;
	const json = JSON.stringify(parseJson);
	fs.writeFileSync('config.json', json);
}
