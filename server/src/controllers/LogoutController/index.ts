import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';

class LogoutController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', this.logoutUser);
	}

	private logoutUser = async (req: Request, res: Response): Promise<void> => {
		try {
			console.log(res, req);

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

const logoutController = new LogoutController();
logoutController.routes();
const controller = logoutController.router;

export { controller };
