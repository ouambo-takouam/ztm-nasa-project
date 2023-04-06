const launches = new Map();

const latestFlightNumber = 100;

const launch = {
	flightNumber: 100,
	mission: 'First mission',
	rocket: 'Explorer IS1',
	launchDate: new Date('December 1, 2023'),
	target: 'Kepler-1652 b',
	customers: ['NASA', 'ZTM'],
	upcoming: true,
	success: true,
};

launches.set(launch.flightNumber, launch);

function existLaunchById(launchId) {
	return launches.has(launchId);
}

function getAllLaunches() {
	return Array.from(launches.values());
}

function addNewLaunch(data) {
	const launch = {
		flightNumber: latestFlightNumber + 1,
		customers: ['NASA', 'ZTM'],
		upcoming: true,
		success: true,
		...data,
	};

	launches.set(launch.flightNumber, launch);

	return launch;
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
