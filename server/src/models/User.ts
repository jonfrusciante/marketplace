import { DataTypeAbstract, DefineAttributeColumnOptions, Instance, Model } from 'sequelize';
import * as Sequelize from 'sequelize';

export interface UserAttributes {
	id: number;
	uuid: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
}

type UserDefineAttributes = {
	[x in keyof UserAttributes]:
		| string
		| DataTypeAbstract
		| DefineAttributeColumnOptions
};

export const UserAttrs: UserDefineAttributes = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	uuid: {
		type: Sequelize.STRING,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
	},
	first_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	last_name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
		set(this: UserInstance, value) {
			this.setDataValue('username', value.toLowerCase());
		},
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: {
				args: true,
				msg: 'Email must be in email format i.e. `jane@gmail.com`',
			},
		},
		set(this: UserInstance, value) {
			this.setDataValue('email', value.toLowerCase());
		},
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: {
				args: [6, 255],
				msg: 'Password must be between 6 and 255 characters',
			},
		},
	},
};

export interface UserInstance extends Instance<UserAttributes> {
	get(): UserAttributes;
}

export interface User extends Model<UserInstance, UserAttributes> {}
