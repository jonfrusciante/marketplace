import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';

import * as messages from '../../lib/helpers/messages';
import requireLogin from '../../lib/middleware/requireLogin';

class LogoutController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', requireLogin, this.logoutUser);
	}

	private logoutUser = async (req: Request, res: Response): Promise<void> => {
		try {
			req.logout();
			await req.session!.destroy(() => {
				res.clearCookie(String(process.env.SESSION_NAME))
					.sendStatus(200);
			});

			return;
		} catch (error) {
			console.log(error);
			res.status(500).json(messages.error500);

			return;
		}
	};
}

const logoutController = new LogoutController();
logoutController.routes();
const controller = logoutController.router;

export { controller };