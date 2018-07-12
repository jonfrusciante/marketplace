import Controller from './Controller';
import * as argon2 from 'argon2';
import { Router, Request, Response } from 'express';
import { User } from '../db';

class LoginController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', this.loginUser);
	}

	private verifyPassword = async (hash: string, password: string): Promise<boolean> => {
		try {
			const verified = await argon2.verify(hash, password);

			return verified;
		} catch (error) {
			console.log(error);

			return false;
		}
	};

	private getUser = async (email: string): Promise<any> => {
		try {
			const user = await User.findOne({
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

			if (email === '' || password === '') {
				res.send(400).json({ success: false, message: 'You must fill out all fields.' });

				return;
			}
			email = this.escapeString(email);
			password = this.escapeString(password);

			const user = await this.getUser(email);

			if (user === null) {
				res.status(400).json({ success: false, message: 'User does not exist.' });

				return;
			}

			const verified = await this.verifyPassword(String(user.password), String(password));
			if (!verified) {
				res.status(400).json({ success: false, message: 'Password is incorrect.' });

				return;
			}

			const response = {
				uuid: user.uuid,
				first_name: user.first_name,
				last_name: user.last_name,
				username: user.username,
				email: user.email,
			};
			// @TODO: Add sessions
			res.status(200).json({ success: true, response });

			return;
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, errors: error.message, message: 'Something went wrong, please try again.' });

			return;
		}
	};
}

const loginController = new LoginController();
loginController.routes();
const controller = loginController.router;

export { controller };
