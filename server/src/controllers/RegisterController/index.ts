import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';

import { User } from '../../models';
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
			const data = new User();
			for (const key in req.body) {
				if (/\S/.test(req.body[key])) {
					data[key] = escapeString(req.body[key]);
				} else {
					res.send(400).json({
						success: false,
						message: 'You must fill out all fields',
					});

					return;
				}
			}

			const userEmailExist = await this.getUserByEmail(data.email);

			if (userEmailExist !== null) {
				res.status(400).json({
					success: false,
					message: 'User with this email already exists.',
				});

				return;
			}

			data.password =
				(await hashPassword(new Buffer(data.password))) || '';
			if (data.password === null || data.password === '') {
				res.status(500).json({
					success: false,
					message: 'Something went wrong, please try again.',
				});

				return;
			}

			const user = User.create({ ...data });

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
				nam: user.name,
				email: user.email,
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
