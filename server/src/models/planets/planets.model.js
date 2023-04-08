const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const Planet = require('./planets.mongo');

function isPlanetHabitable(planet) {
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

async function loadPlanetsData() {
	new Promise((resolve, reject) => {
		fs.createReadStream(
			path.join(__dirname, '..', '..', '..', 'data', 'kepler_data.csv')
		)
			.pipe(
				parse({
					comment: '#',
					columns: true,
				})
			)
			.on('data', async (planet) => {
				if (isPlanetHabitable(planet)) {
					await savePlanet(planet.kepler_name);
				}
			})
			.on('error', (err) => {
				reject(err);
			})
			.on('end', async () => {
				const planets = await getAllPlanets();
				console.log(`${planets.length} habitable planets found`);
				resolve();
			});
	});
}

async function savePlanet(keplerName) {
	await Planet.updateOne({ keplerName }, { keplerName }, { upsert: true });
}

async function getAllPlanets() {
	return await Planet.find({}, '-_id -__v');
}

module.exports = {
	loadPlanetsData,
	getAllPlanets,
};
