import { ErrorRequestHandler, Request, Response } from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as frameguard from 'frameguard';
import * as session from 'express-session';
// import * as passport from 'passport';

import { UserController, LoginController, RegisterController } from './controllers';

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
		this.app.use(helmet());
		this.app.use(cors());
		this.app.use(session({
			secret: 'Hello',
			saveUninitialized: false,
			resave: false,
			cookie: {
				path: '/',
				httpOnly: true,
				secure: false,
				maxAge: 38000,
				domain: 'http://localhost:3000'
			}
		}));
		// this.app.use(passport.initialize());
		// this.app.use(passport.session());
	}

	public routes(): void {
		const router: express.Router = express.Router();

		this.app.use('/', router);
		this.app.use('/api/v1/users', UserController);
		this.app.use('/api/v1/register', RegisterController);
		this.app.use('/api/v1/login', LoginController);
		this.app.use(
			(err: ErrorRequestHandler, req: Request, res: Response) => {
				console.log(req.session);
				console.log(err);
				res.status(404).json({ success: false, message: '404 - Page not found.'});
			}
		);
	}
}

export default new Server().app;
