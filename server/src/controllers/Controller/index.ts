import * as dotenv from 'dotenv';
import { createConnection, getRepository } from 'typeorm';

import { User } from '../../models/User';

class Controller {
	constructor() {
		dotenv.config();
		this.dbInit();
	}

	public dbInit = async () => {
		const host = process.env.DB_HOST;
		const database = process.env.DB_DATABASE;
		const password = process.env.DB_PASSWORD;
		const username = process.env.DB_USER;
		const port = Number(process.env.DB_PORT);
		const connection = await createConnection({
			type: 'mysql',
			port,
			host,
			username,
			password,
			database,
			synchronize: true,
			logging: true,
			entities: ['build/models/**/*.js'],
			migrations: ['build/migrations/**/*.js'],
			subscribers: ['build/subscribers/**/*.js'],
			cli: {
				entitiesDir: 'build/models',
				migrationsDir: 'build/migrations',
				subscribersDir: 'build/subscribers',
			},
		});
		await connection.close();
		await connection.connect();
	};

	public getUserByEmail = async (email: string): Promise<any> => {
		try {
			const user = await getRepository(User).findOne({
				where: { email },
			});

			if (typeof user === 'undefined') {
				return null;
			}

			return user;
		} catch (error) {
			console.error(error);

			return null;
		}
	};
}

export { Controller };
