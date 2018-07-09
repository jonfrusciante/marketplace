import Controller from './Controller';
import * as argon2 from 'argon2';
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../db';

interface User {
	email: string;
	password: string;
}

class RegisterController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	private hashPassword = async (password: Buffer): Promise<string> => {
		const options = {
			timeCost: 4,
			memoryCost: 2 ** 13,
			parallelism: 2,
			type: argon2.argon2d,
		};

		try {
			const hash = await argon2.hash(password, options);

			return hash;
		} catch (error) {
			console.log(error.message);
			// this.handleError(error.message, null);

			return null;
		}
	};

	private getUser = async (email): Promise<User> => {
		try {
			let user = await User.findOne({
				where: { email },
			});
			if (user === null) {
				return null;
			}

			return user;
		} catch (error) {
			console.error(error);

			return null;
		}
	};

	private registerUser = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			let { first_name, last_name, username, email, password } = req.body;

			first_name = this.escapeString(first_name);
			last_name = this.escapeString(last_name);
			username = this.escapeString(username);
			email = this.escapeString(email);
			password = this.escapeString(password);

			let userExist = await this.getUser(email);

			if (userExist !== null) {
				res.status(403).json({ message: 'User already exists.' });

				return;
			}

			password = await this.hashPassword(password);
			if (password === null) {
				res.status(500).json({
					message: 'Something went wrong, please try again.',
				});

				return;
			}

			const user = new User({
				first_name,
				last_name,
				username,
				email,
				password,
			});
			await user.save();
			res.status(200).json({ user });

			return;
		} catch (error) {
			console.log(error.message);
			// this.handleError(error.message, res);

			return;
		}
	};

	routes() {
		this.router.post('/', this.registerUser);
	}
}

const registerController = new RegisterController();
registerController.routes();

export default registerController.router;
