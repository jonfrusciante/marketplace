import { Controller } from '../Controller';
import { Router, Response } from 'express';

// import { sign } from '../../lib/auth/userToken';
// import * as messages from '../../lib/helpers/messages';
import requireLogin from '../../lib/middleware/requireLogin';

class AuthController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.post('/', requireLogin, this.authCheck);
	}

	private authCheck = (_: any, res: Response): void => {
		res.sendStatus(200);

		return;
	};
}

const authController = new AuthController();
authController.routes();
const controller = authController.router;

export { controller };
