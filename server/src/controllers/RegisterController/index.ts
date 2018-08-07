import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check';

import { User } from '../../models';
import { hashPassword } from '../../lib/auth/password';
import { sign } from '../../lib/auth/userToken';
import { getUserByEmail } from '../../models/User/helpers';
import * as messages from '../../lib/helpers/messages';

const validation = [
	body('email')
		.isEmail()
		.normalizeEmail()
		.escape(),
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
			const email = this.escapeString(req.body.email);
			const name = this.escapeString(req.body.name);
			const password = this.escapeString(req.body.password);

			const userEmailExist = await getUserByEmail(email);

			if (userEmailExist !== null) {
				res.status(422).json(messages.error422);

				return;
			}

			let hashedPassword;
			try {
				if (password) {
					hashedPassword = await hashPassword(new Buffer(password));
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

			const user = User.create({
				email,
				name,
				password: String(hashedPassword),
			});

			try {
				await user.save();
			} catch (error) {
				console.log(error);
				res.status(500).json(messages.error500);

				return;
			}

			req.login(user.id, (error: any) => {
				if (error) {
					res.status(500).json(messages.error500);

					return;
				}

				const token = sign(user);

				const response = {
					id: user.id,
					name: user.name,
					email: user.email,
					token,
				};

				res.set('X-USER-TOKEN', req.sessionID);

				res.status(200).json({ response, message: 'Success' });

				return;
			});

			return;
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
