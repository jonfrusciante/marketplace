import * as request from 'supertest';

import Server from '../server';

describe('Test the register routes', () => {
	test('It should respond after user is successfully registered', async () => {
		// const data = {
		// 	first_name: 'duran',
		// 	last_name: 'humes',
		// 	username: 'duran',
		// 	email: 'duranhumes@gmail.com',
		// 	password: 'password',
		// };
		// await request(Server)
		// 	.post('/api/v1/register')
		// 	.send(data)
		// 	// .set('Accept', 'application/json')
		// 	.expect(200)
		// 	.end((err, res) => {
		// 		console.log(err);
		// 		console.log(res);
		// 		return;
		// 	});

		return await request(Server)
			.get('/api/v1/token')
			.expect(200);
	});
});
