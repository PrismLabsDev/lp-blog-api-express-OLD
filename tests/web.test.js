const server = require('../server');
const request = require('supertest');

describe('GET Web root', () => {
	it('Returns text when accessed.', async () => {
		const res = await request(server.app).get('/');
		expect(res.statusCode).toEqual(200);
		expect(res.body.message).toEqual('Welcome to our blog.');
	});
});
