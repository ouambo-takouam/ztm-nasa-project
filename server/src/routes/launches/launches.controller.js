const {
	getAllLaunches,
	addNewLaunch,
} = require('../../models/launches/launches.model');

async function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
	const data = req.body;
	const { mission, rocket, launchDate, target } = data;

	if (!mission || !rocket || !launchDate || !target) {
		return res.status(400).json({
			error: 'Missing launch data',
		});
	}

	data.launchDate = new Date(launchDate);

	if (data.launchDate.toString === 'Invalid Date') {
		return res.status(400).json({
			error: 'Invalid launch date',
		});
	}

	return res.status(200).json(addNewLaunch(data));
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch };
