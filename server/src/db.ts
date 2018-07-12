import * as Sequelize from 'sequelize';
import { UserAttributes, UserInstance, UserAttrs } from './models/User';
import * as dotenv from 'dotenv';

dotenv.config();
declare var process: {
	env: {
		DB_DATABASE: string;
		DB_USER: string;
		DB_PASSWORD: string;
	};
};

const db = process.env.DB_DATABASE;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const sequelize = new Sequelize(db, user, password, {
	host: 'localhost',
	dialect: 'mysql',
});

export const User: any = sequelize.define<UserInstance, UserAttributes>(
	'users',
	UserAttrs
);

// sequelize.sync({ force: true }).then(() => {
// 	console.log(`Database & tables created!`);
// });

