import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';

import { User } from '../../models/User';
import { hashPassword } from '../../lib/auth/password';
import { escapeString } from '../../lib/helpers/escapeString';

class RegisterController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', this.registerUser);
	}

	private registerUser = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			let { firstName, lastName, username, email, password } = req.body;

			if (
				firstName === '' ||
				lastName === '' ||
				username === '' ||
				email === '' ||
				password === ''
			) {
				res.send(400).json({
					success: false,
					message: 'You must fill out all fields',
				});

				return;
			}

			firstName = escapeString(firstName);
			lastName = escapeString(lastName);
			username = escapeString(username);
			email = escapeString(email);
			password = escapeString(password);

			const userExist = await this.getUserByEmail(email);

			if (userExist !== null) {
				res.status(400).json({
					success: false,
					message: 'User already exists.',
				});

				return;
			}

			password = await hashPassword(password);
			if (password === null) {
				res.status(500).json({
					success: false,
					message: 'Something went wrong, please try again.',
				});

				return;
			}

			const user = User.create({
				firstName,
				lastName,
				username,
				email,
				password,
			});

			try {
				await user.save();
			} catch (error) {
				res.status(500).json({
					success: false,
					errors: error.message,
					message: 'Something went wrong, please try again.',
				});
				console.log(error);

				return;
			}

			const response = {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				email: user.email,
			};

			res.status(200).json({ success: true, response });

			return;
		} catch (error) {
			res.status(500).json({
				success: false,
				errors: error.message,
				message: 'Something went wrong, please try again.',
			});
			console.log(error);

			return;
		}
	};
}

const registerController = new RegisterController();
registerController.routes();
const controller = registerController.router;

export { controller };
