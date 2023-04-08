const {
	existLaunchById,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
} = require('../../models/launches/launches.model');

async function httpGetAllLaunches(req, res) {
	return res.status(200).json(await getAllLaunches());
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

	if (data.launchDate.toString() === 'Invalid Date') {
		return res.status(400).json({
			error: 'Invalid launch date',
		});
	}

	const response = await addNewLaunch(data);

	if (!response) {
		return { ok: false };
	}

	return res.status(201).json({ ok: true });
}

async function httpAbortLaunchById(req, res) {
	const launchId = +req.params.id;

	if (!existLaunchById(launchId)) {
		return res.status(404).json({
			error: 'Launch not found',
		});
	}

	return res.status(201).json(abortLaunchById(launchId));
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunchById };
