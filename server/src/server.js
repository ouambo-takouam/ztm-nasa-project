const http = require('http');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets/planets.model');

const PORT = 8000;

const server = http.createServer(app);

loadPlanetsData();

server.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}...`);
});
