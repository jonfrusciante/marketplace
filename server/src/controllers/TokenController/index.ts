import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import * as uuid from 'uuid/v4';
import * as crypto from 'crypto';
import { createSecret } from '../../lib/helpers/secret';

class TokenController extends Controller {
	router: Router;
	csrf: string | null;
	publicKey: any;
	privateKey: any;

	constructor() {
		super();

		this.router = Router();
		this.routes();
		this.csrf = null;
		this.publicKey = null;
		this.privateKey = null;
	}

	routes() {
		this.router.get('/', this.sendToken);
		this.router.post('/', this.verifyToken);
	}

	private sendToken = async (_: any, res: Response): Promise<void> => {
		try {
			const response = { _csrf: uuid(), publicKey: '' };
			res.cookie('XSRF-TOKEN', response._csrf, {
				maxAge: 180000,
				httpOnly: true,
				// signed: true,
			}); // 180000 3 Minutues
			res.locals.csrftoken = response._csrf;

			const nonce = createSecret(10);
			this.privateKey = `${nonce}${response._csrf}`;

			const publicKey = crypto
				.createHmac('sha256', this.privateKey)
				.update('XSRF-TOKEN')
				.digest('hex');
			response.publicKey = publicKey;
			this.publicKey = response.publicKey;
			this.csrf = response._csrf;

			console.log('Public Key: ', this.publicKey);
			console.log('Private Key: ', this.privateKey);

			res.status(200).json({ success: true, response });

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

	private verifyToken = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			if (req.headers.cookie) {
				console.log(req.headers);
				const XSRF: string = String(req.headers.cookie).split('=')[1];
				// const newKey = crypto
				// 	.createHmac('sha256', this.publicKey)
				// 	.update('XSRF-TOKEN')
				// 	.digest('hex');
				// console.log('New Key: ', newKey);
				// console.log('Public Key: ', this.publicKey);
				// if (this.privateKey !== newKey) {
				// 	res.clearCookie('XSRF-TOKEN');
				// 	res.status(403).json({
				// 		success: false,
				// 		message: 'Invalid CSRF Token. Key',
				// 	});

				// 	return;
				// }

				if (XSRF !== this.csrf) {
					res.clearCookie('XSRF-TOKEN');
					res.status(403).json({
						success: false,
						message: 'Invalid CSRF Token.',
					});

					return;
				}

				res.clearCookie('XSRF-TOKEN');
				res.status(200).json({ success: true, message: 'Success.' });

				return;
			}
			res.status(400).json({
				success: false,
				message: 'No CSRF Token found.',
			});

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

const tokenController = new TokenController();
tokenController.routes();
const controller = tokenController.router;

export { controller };
