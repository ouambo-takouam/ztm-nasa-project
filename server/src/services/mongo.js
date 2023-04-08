const mongoose = require('mongoose');

const MONGO_URL =
	'mongodb+srv://nasa-api:QFX83cwEz8JMoGJF@nasacluster.u4hkq82.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
	console.log('Connection to mongo atlas open');
});

mongoose.connection.once('error', (error) => {
	console.error(error);
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}

module.exports = {
	mongoConnect,
};
