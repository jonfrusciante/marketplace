import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator/check';

import { verifyPassword } from '../../lib/auth/password';
import { sign } from '../../lib/auth/userToken';
import { getUserByEmail } from '../../models/User/helpers';

const validation = [
	body('email')
		.isEmail()
		.normalizeEmail(),
	body('password')
		.not()
		.isEmpty()
		.trim()
		.escape(),
];

class LoginController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', [...validation], this.login);
	}

	private login = async (req: Request, res: Response): Promise<void> => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			res.status(422).json({ response: {}, message: 'Validation Error' });

			return;
		}

		try {
			const data = { email: '', password: '' };

			const user = await getUserByEmail(data.email);

			if (user === null) {
				res.status(400).json({
					response: {},
					message: 'User does not exist.',
				});

				return;
			}

			const verified = await verifyPassword(
				String(user.password),
				String(data.password)
			);

			if (!verified) {
				res.status(400).json({
					response: {},
					message: 'Password is incorrect.',
				});

				return;
			}

			let token;
			req.login(user.id, (error: any) => {
				if (error) {
					res.status(500).json({
						response: {},
						message: 'Something went wrong, please try again.',
					});

					return;
				}

				token = sign(user);
			});

			const response = {
				id: user.id,
				name: user.name,
				email: user.email,
				token,
			};

			res.set('X-USER-TOKEN', req.sessionID);

			res.status(200).json({ response, message: 'Success' });

			return;
		} catch (error) {
			console.log(error);
			res.status(500).json({
				response: {},
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
