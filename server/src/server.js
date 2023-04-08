const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets/planets.model');

const PORT = 8000;

const MONGO_URL =
	'mongodb+srv://nasa-api:QFX83cwEz8JMoGJF@nasacluster.u4hkq82.mongodb.net/nasa?retryWrites=true&w=majority';

// event listeners
mongoose.connection.once('open', () => {
	console.log('Connection to mongo atlas open');
});

mongoose.connection.once('error', (error) => {
	console.error(error);
});

const server = http.createServer(app);

// Establish connection to mongodb before running server
mongoose.connect(MONGO_URL);
loadPlanetsData();

server.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}...`);
});
