const Launch = require('./launches.mongo');

const launches = new Map();

const launch = {
	flightNumber: 100,
	mission: 'First mission',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 1, 2023'),
	target: 'Kepler-1652 b',
};

saveLaunch(launch);

function existLaunchById(launchId) {
	return launches.has(launchId);
}

async function getLatestFlightNumber() {
	const latestLaunch = await Launch.findOne().sort('-flightNumber');

	return latestLaunch.flightNumber;
}

async function getAllLaunches() {
	return await Launch.find({}, '-_id -__v');
}

async function saveLaunch(data) {
	const { flightNumber } = data;

	return await Launch.updateOne({ flightNumber }, data, { upsert: true });
}

async function addNewLaunch(data) {
	const latestFlightNumber = await getLatestFlightNumber();

	const response = await saveLaunch({
		flightNumber: latestFlightNumber + 1,
		...data,
	});

	return response.upsertedCount === 1;
}

function abortLaunchById(launchId) {
	const launch = launches.get(launchId);
	launch.upcoming = false;
	launch.success = false;

	return launch;
}

module.exports = {
	existLaunchById,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
};
