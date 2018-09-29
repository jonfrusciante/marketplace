import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';

class TokenController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', this.sendToken);
	}

	private sendToken = async (req: Request, res: Response): Promise<void> => {
		const token = req.csrfToken();
		console.log('Token: ', token);
		res.status(200).json({ _csrf: token });
	};
}

const tokenController = new TokenController();
tokenController.routes();
const controller = tokenController.router;

export { controller };
