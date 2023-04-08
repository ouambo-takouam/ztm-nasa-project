const Launch = require('./launches.mongo');

const launch = {
	flightNumber: 100,
	mission: 'First mission',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 1, 2023'),
	target: 'Kepler-1652 b',
};

saveLaunch(launch);

async function existLaunchById(launchId) {
	return await Launch.findOne({ flightNumber: launchId });
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

async function abortLaunchById(launchId) {
	const response = await Launch.updateOne(
		{ flightNumber: launchId },
		{ upcoming: false, success: false }
	);

	console.log(response);

	return response.modifiedCount === 1;
}

module.exports = {
	existLaunchById,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
};
