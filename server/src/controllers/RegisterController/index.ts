import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check';

import { User } from '../../models';
import { hashPassword } from '../../lib/auth/password';
import { getUserByEmail } from '../../models/User/helpers';
import * as messages from '../../lib/helpers/messages';

const validation = [
	body('email')
		.isEmail()
		.normalizeEmail(),
	body('name')
		.not()
		.isEmpty()
		.trim()
		.escape(),
	body('password')
		.not()
		.isEmpty()
		.trim()
		.escape(),
];
class RegisterController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', [...validation], this.registerUser);
	}

	private registerUser = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			res.status(422).json({ response: {}, message: 'Validation Error' });

			return;
		}

		try {
			const data = new User();

			const userEmailExist = await getUserByEmail(data.email);

			if (userEmailExist !== null) {
				res.status(422).json(messages.error422);

				return;
			}
			let password;
			try {
				if (data.password) {
					password = await hashPassword(new Buffer(data.password));
				}
			} catch (error) {
				console.log(error);

				res.status(500).json(messages.error500);

				return;
			}

			if (!password) {
				res.status(500).json(messages.error500);

				return;
			}

			data.password = password;

			const user = User.create({ ...data });

			try {
				await user.save();
			} catch (error) {
				console.log(error);
				res.status(500).json(messages.error500);

				return;
			}

			const response = {
				id: user.id,
				name: user.name,
				email: user.email,
			};

			req.login(response.id, (error: any) => {
				if (error) {
					res.status(500).json(messages.error500);

					return;
				}

				res.status(200).json({ response, message: 'Success' });

				return;
			});
		} catch (error) {
			console.log(error);
			res.status(500).json(messages.error500);

			return;
		}
	};
}

const registerController = new RegisterController();
registerController.routes();
const controller = registerController.router;

export { controller };
