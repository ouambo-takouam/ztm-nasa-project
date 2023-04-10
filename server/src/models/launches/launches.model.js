const axios = require('axios');
const Launch = require('./launches.mongo');

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const launch = {
	flightNumber: 100, //flight_number
	mission: 'First mission', //name
	rocket: 'Explorer IS1', //rocket.name
	launchDate: new Date('December 1, 2023'), //date_local
	target: 'Kepler-1652 b', //not set
	/**
	 * customers => payloads.customers []
	 * upcoming
	 * success
	 */
};

saveLaunch(launch);

async function loadLaunchesData() {
	const response = await axios.post(SPACEX_API_URL, {
		pagination: false,
		query: {},
		options: {
			populate: [
				{
					path: 'rocket',
					select: {
						name: 1,
					},
				},
				{
					path: 'payloads',
					select: {
						customers: 1,
					},
				},
			],
		},
	});

	const launchDocs = response.data.docs;

	for (const launchDoc of launchDocs) {
		const {
			flight_number,
			name,
			rocket,
			date_local,
			payloads,
			upcoming,
			success,
		} = launchDoc;

		const customers = payloads.flatMap((payload) => payload['customers']);

		const launch = {
			flightNumber: flight_number,
			mission: name,
			rocket,
			launchDate: date_local,
			customers,
			upcoming,
			success,
		};

		console.log(launch);
	}
}

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
	loadLaunchesData,
	existLaunchById,
	getAllLaunches,
	addNewLaunch,
	abortLaunchById,
};
