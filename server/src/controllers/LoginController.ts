import Controller from './Controller';
import * as argon2 from 'argon2';
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../db';

interface User {
	uuid: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
}

class LoginController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	private verifyPassword = async (
		hash: string,
		password: string
	): Promise<boolean> => {
		try {
			const verified = await argon2.verify(hash, password);

			return verified;
		} catch (err) {
			console.log(err);

			return false;
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

	private loginUser = async (req: Request, res: Response): Promise<void> => {
		try {
			let { email, password } = req.body;
			email = this.escapeString(email);
			password = this.escapeString(password);

			let user = await this.getUser(email);

			if (user === null) {
				res.status(403).json({ message: 'User does not exist' });

				return;
			}

			const verified = await this.verifyPassword(user.password, password);
			if (!verified) {
				res.status(403).json({ message: 'Password is incorrect' });

				return;
			}

			let response = {
				uuid: user.uuid,
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				email: user.email,
			};
			// @TODO: Add sessions
			res.status(200).json({ response });

			return;
		} catch (error) {
			console.log(error);
			res.status(500).json({ error });

			return;
		}
	};

	routes() {
		this.router.post('/', this.loginUser);
	}
}

const loginController = new LoginController();
loginController.routes();

export default loginController.router;
