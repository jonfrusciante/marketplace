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

	private login = async (req: Request, res: Response): Promise<Response> => {
		try {
			const data = { email: '', password: '' };
			for (const key in req.body) {
				if (/\S/.test(req.body[key])) {
					data[key] = this.escapeString(req.body[key]);
				}
			}

			const user = await this.getUserByEmail(data.email);

			if (user === null) {
				return res.status(400).json({
					success: false,
					message: 'User does not exist.',
				});
			}

			const verified = await verifyPassword(
				String(user.password),
				String(data.password)
			);
			if (!verified) {
				return res.status(400).json({
					success: false,
					message: 'Password is incorrect.',
				});
			}

			req.login(user.id, () => {
				// return res.status(500).json({
				// 	success: false,
				// 	message: 'Something went wrong, please try again.',
				// });
			});

			const response = {
				id: user.id,
				name: user.name,
				email: user.email,
				SID: req.sessionID,
			};

			res.set('X-USER-TOKEN', req.sessionID);

			return res.status(200).json({ success: true, response });
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				success: false,
				errors: error.message,
				message: 'Something went wrong, please try again.',
			});
		}
	};
}

const loginController = new LoginController();
loginController.routes();
const controller = loginController.router;

export { controller };
