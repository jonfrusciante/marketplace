import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as frameguard from 'frameguard';
import * as csurf from 'csurf';

// import { logger, stream } from './lib/logger';

import UserController from './controllers/UserController';
import RegisterController from './controllers/RegisterController';
import LoginController from './controllers/LoginController';

class Server {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.config();
		this.routes();
		dotenv.config();
	}

	public config() {
		this.app.disable('x-powered-by');
		this.app.use(frameguard({ action: 'deny' }));
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(compression());
		this.app.use(logger('dev'));
		// this.app.use(logger('combined', { stream }));
		this.app.use(helmet());
		this.app.use(cors());
	}

	public routes(): void {
		let router: express.Router;
		router = express.Router();

		let csrf = csurf({ cookie: true });

		this.app.use('/', router);
		this.app.use('/api/v1/users', csrf, UserController);
		// this.app.use('/api/v1/products', csrf, requireLogin, ProductController);
		this.app.use('/api/v1/register', csrf, RegisterController);
		this.app.use('/api/v1/login', csrf, LoginController);
		this.app.use((error, req, res, next) => {
			if (error.code !== 'EBADCSRFTOKEN') {
				res.status(403).send('Form tampered with');
				return next(error);
			}
			res.status(404).send('Not Found');
		});
	}
}

export default new Server().app;
