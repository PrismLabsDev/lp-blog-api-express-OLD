const server = require('../server');
const request = require('supertest');

describe('GET API root', () => {
	it('Returns text when accessed.', async () => {
		const res = await request(server.app).get('/api');
		expect(res.statusCode).toEqual(200);
		expect(res.body.message).toEqual('Welcome to our blog.');
	});
});
