const launches = new Map();

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

function getAllLaunches() {
	return Array.from(launches.values());
}

module.exports = {
	getAllLaunches,
};
