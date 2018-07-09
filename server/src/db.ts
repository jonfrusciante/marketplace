import * as Sequelize from 'sequelize';
import UserModel from './models/User';
import * as dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: 'localhost',
		dialect: 'mysql',
	}
);

const User = UserModel(sequelize, Sequelize);

// sequelize.sync({ force: true }).then(() => {
// 	console.log(`Database & tables created!`);
// });

export { User };
