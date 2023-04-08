const http = require('http');

const app = require('./app');

const { mongoConnect } = require('./services/mongo');

const { loadPlanetsData } = require('./models/planets/planets.model');

const PORT = 8000;

const server = http.createServer(app);

// Establish connection to mongodb before running server
mongoConnect();
loadPlanetsData();

server.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}...`);
});
