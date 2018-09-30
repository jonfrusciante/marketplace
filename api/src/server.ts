import 'reflect-metadata';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as frameguard from 'frameguard';
import * as session from 'express-session';
import * as MySQLStore from 'express-mysql-session';
import * as passport from 'passport';
import { getRepository, createConnection } from 'typeorm';

import {
	UserController,
	RegisterController,
	LoginController,
	LogoutController,
	ProductController,
	CategoryController,
	AuthController,
} from './controllers';
import { Users } from './models';

class Server {
	app: express.Application;

	constructor() {
		this.app = express();
		this.dbInit();
		this.config();
		this.routes();
	}

	config() {
		this.app.disable('x-powered-by');
		this.app.use(frameguard({ action: 'deny' }));
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(compression());
		this.app.use(logger('dev'));
		this.app.use(helmet());
		this.app.use(
			cors({
				credentials: true,
				origin: process.env.CLIENT_URL,
			})
		);
		this.app.use(
			session({
				secret: String(process.env.SESSION_SECRET),
				saveUninitialized: false,
				resave: false,
				name: process.env.SESSION_NAME,
				store: new MySQLStore({
					host: process.env.DB_HOST,
					port: Number(process.env.DB_PORT),
					user: process.env.DB_USER,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_DATABASE,
					expiration: Number(process.env.SESSION_EXPIRE),
					createDatabaseTable: true,
					clearExpired: true,
					checkExpirationInterval: Number(process.env.SESSION_EXPIRE),
					schema: {
						tableName: 'session',
						columnNames: {
							session_id: 'session_id',
							expires: 'expires',
							data: 'data',
						},
					},
				}),
				cookie: {
					path: '/',
					httpOnly: true,
					secure: true,
					expires: new Date(
						Date.now() + Number(process.env.SESSION_EXPIRE)
					),
					maxAge: Number(process.env.SESSION_EXPIRE),
					domain: process.env.CLIENT_URL,
					sameSite: true,
				},
				unset: 'destroy',
			})
		);
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	async dbInit() {
		const host = process.env.DB_HOST;
		const database = process.env.DB_DATABASE;
		const password = process.env.DB_PASSWORD;
		const username = process.env.DB_USER;
		const port = Number(process.env.DB_PORT);
		const connection = await createConnection({
			type: 'mysql',
			port,
			host,
			username,
			password,
			database,
			synchronize: true,
			logging: true,
			entities: ['build/models/**/*.js'],
			migrations: ['build/migrations/**/*.js'],
			subscribers: ['build/subscribers/**/*.js'],
			cli: {
				entitiesDir: 'build/models',
				migrationsDir: 'build/migrations',
				subscribersDir: 'build/subscribers',
			},
		});
		await connection.close();
		// await connection.runMigrations();
		await connection.connect();
	}

	async routes() {
		const router: express.Router = express.Router();

		this.app.use('/', router);
		this.app.use('/api/v1/authCheck', AuthController);
		this.app.use('/api/v1/user', UserController);
		this.app.use('/api/v1/register', RegisterController);
		this.app.use('/api/v1/login', LoginController);
		this.app.use('/api/v1/logout', LogoutController);
		this.app.use('/api/v1/product', ProductController);
		this.app.use('/api/v1/category', CategoryController);
		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser(async (id, done) => {
			try {
				const user = await getRepository(Users).findOne(id, {
					select: ['id', 'name', 'email', 'role'],
				});

				done(null, user);
			} catch (error) {
				console.log('Error In Passport Deserialize: ', error);
				done(error, false);
			}
		});
		this.app.get('/favicon.ico', (_: any, res: express.Response) =>
			res.status(204)
		);
		this.app.use(
			(
				err: express.ErrorRequestHandler,
				_: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				console.log('Error: ', err);
				res.status(404).json({
					response: {},
					message: '404 - Page not found.',
				});

				return next();
			}
		);
	}
}

export default new Server().app;
