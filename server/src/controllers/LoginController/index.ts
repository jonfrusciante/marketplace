import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';

import { verifyPassword } from '../../lib/auth/password';

class LoginController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', this.login);
	}

	private login = async (req: Request, res: Response): Promise<void> => {
		try {
			let { email, password } = req.body;

			if (email === '' || password === '') {
				res.send(400).json({
					success: false,
					message: 'You must fill out all fields.',
				});

				return;
			}

			email = this.escapeString(email);
			password = this.escapeString(password);

			const user = await this.getUserByEmail(email);

			if (user === null) {
				res.status(400).json({
					success: false,
					message: 'User does not exist.',
				});

				return;
			}

			const verified = await verifyPassword(
				String(user.password),
				String(password)
			);
			if (!verified) {
				res.status(400).json({
					success: false,
					message: 'Password is incorrect.',
				});

				return;
			}

			const response = {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				email: user.email,
				gender: user.gender,
				dob: user.DOB,
			};

			req.login(response.id, error => {
				console.log('Login ID: ', response.id);
				if (error) {
					res.status(500).json({
						success: false,
						error: error.message,
						message: 'Something went wrong, please try again.',
					});

					return;
				}

				res.status(200).json({ success: true, response });

				return;
			});

			return;
		} catch (error) {
			console.log(error);
			res.status(500).json({
				success: false,
				errors: error.message,
				message: 'Something went wrong, please try again.',
			});

			return;
		}
	};
}

const loginController = new LoginController();
loginController.routes();
const controller = loginController.router;

export { controller };
