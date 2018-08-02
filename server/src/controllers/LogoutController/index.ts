import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
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
				res.clearCookie('connect.sid');
			});

			res.status(200).json({
				response: {},
				message: "You've been logged out.",
			});

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

const logoutController = new LogoutController();
logoutController.routes();
const controller = logoutController.router;

export { controller };
