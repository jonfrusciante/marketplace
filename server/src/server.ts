import 'reflect-metadata';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as frameguard from 'frameguard';
import * as dotenv from 'dotenv';
// import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';
// import * as redis from 'connect-redis';

import {
	UserController,
	RegisterController,
	LoginController,
	LogoutController,
	TokenController,
} from './controllers';

class Server {
	public app: express.Application;

	constructor() {
		dotenv.config();
		this.app = express();
		this.config();
		this.routes();
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
		// this.app.use(cookieParser(secret(10)));
		// this.app.use(csrf());
		// const redisStore = redis(session);
		// this.app.use(
		// 	session({
		// 		store: new redisStore({
		// 			host: process.env.REDIS_HOST,
		// 		}),
		// 		secret: `${process.env.SESSION_SECRET}`,
		// 		saveUninitialized: false,
		// 		resave: false,
		// 		cookie: {
		// 			path: '/',
		// 			httpOnly: true,
		// 			maxAge: 604800, // 7 days
		// 			domain: `${process.env.CLIENT_URL}`,
		// 			secure: process.env.NODE_ENV === 'production',
		// 		},
		// 	})
		// );
	}

	public async routes() {
		const router: express.Router = express.Router();

		this.app.use('/', router);
		this.app.use('/api/v1/users', UserController);
		this.app.use('/api/v1/register', RegisterController);
		this.app.use('/api/v1/login', LoginController);
		this.app.use('/api/v1/logout', LogoutController);
		this.app.use('/api/v1/token', TokenController);
		this.app.use(
			(
				err: express.ErrorRequestHandler,
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				console.log(err);
				console.log(req);
				res.send(404).json({
					success: false,
					message: '404 - Page not found.',
				});

				next();
			}
		);
	}
}

export default new Server().app;
