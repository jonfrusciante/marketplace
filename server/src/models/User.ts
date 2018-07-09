export default function(sequelize, DataTypes) {
	let users = sequelize.define(
		'users',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			uuid: {
				type: DataTypes.STRING,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				set(value) {
					this.setDataValue('username', value.toLowerCase());
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				set(value) {
					this.setDataValue('email', value.toLowerCase());
				},
				validate: {
					isEmail: {
						args: true,
						msg:
							'Email must be in email format i.e. `jane@gmail.com`',
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: {
						args: [6, 255],
						msg: 'Password must be between 6 and 255 characters',
					},
				},
			},
		},
		{
			tableName: 'users',
			paranoid: true,
			timestamps: true,
			underscored: true,
			indexes: [
				{
					unique: true,
					fields: ['username', 'email'],
				},
			],
		}
	);

	return users;
}
