const request = require('supertest');

const app = require('../../app');

const { mongoConnect } = require('../../services/mongo');

describe('Launches API', () => {
	beforeAll(async () => {
		await mongoConnect();
	});

	describe('Test GET /launches', () => {
		test('It should respond with 200 success', async () => {
			await request(app)
				.get('/launches')
				.expect('Content-Type', /json/)
				.expect(200);
		});
	});

	describe('Test POST /launches', () => {
		test('It should respond with 201 created', async () => {
			await request(app)
				.post('/launches')
				.send({
					mission: 'USS Enterprise',
					rocket: 'NCC 1701',
					target: 'Kepler-184',
					launchDate: 'December 12, 2023',
				})
				.expect('Content-Type', /json/)
				.expect(201);
		});

		test('It should catch missing required properties', async () => {
			await request(app)
				.post('/launches')
				.send({
					mission: 'USS Enterprise',
					rocket: 'NCC 1701',
					target: 'Kepler-184',
				})
				.expect('Content-Type', /json/)
				.expect(400);
		});

		test('It should catch invalid dates', async () => {
			await request(app)
				.post('/launches')
				.send({
					mission: 'USS Enterprise',
					rocket: 'NCC 1701',
					target: 'Kepler-184',
					launchDate: 'Hello',
				})
				.expect('Content-Type', /json/)
				.expect(400);
		});
	});
});
