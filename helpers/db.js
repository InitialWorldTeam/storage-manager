const mongoose = require('mongoose');
const config = require('../config/index.js');

databaseUrl = config.database;

function initDb() {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			config: {
				autoIndex: false,
			}});

		mongoose.connection.on('connected', () => {
			console.log(`Mongoose connect success: ${databaseUrl}`);
			resolve()
		});
		mongoose.connection.on('error', (err) => {
			console.log(`Mongoose connect error: ${err}`);
			reject(err);
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnect!');
			resolve()
		});
	});
}


module.exports = initDb
