import 'reflect-metadata';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as frameguard from 'frameguard';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as mysqlStore from 'express-mysql-session';
import * as passport from 'passport';
import { getRepository, createConnection } from 'typeorm';

import {
	UserController,
	RegisterController,
	LoginController,
	LogoutController,
	TokenController,
	ProductController,
} from './controllers';

import { User } from './models';

class Server {
	public app: express.Application;

	constructor() {
		dotenv.config();
		this.app = express();
		this.dbInit();
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
		this.app.use(
			cors({
				credentials: true,
				origin: `${process.env.CLIENT_URL}`,
				exposedHeaders: ['Content-Type', 'Authorization'],
			})
		);
		this.app.use(cookieParser());
		// this.app.use(csrf());
		this.app.use(
			session({
				secret: `${process.env.SESSION_SECRET}`,
				saveUninitialized: true,
				resave: false,
				store: new mysqlStore({
					host: process.env.DB_HOST,
					port: Number(process.env.DB_PORT),
					user: process.env.DB_USER,
					password: process.env.DB_PASSWORD,
					database: process.env.DB_DATABASE,
					expiration: Number(process.env.SESSION_EXPIRE),
					createDatabaseTable: true,
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
					httpOnly: false,
					secure: false,
					expires: new Date(
						Date.now() + Number(process.env.SESSION_EXPIRE)
					),
					maxAge: Number(process.env.SESSION_EXPIRE),
					domain: `${process.env.CLIENT_URL}`,
					sameSite: true,
				},
			})
		);
		this.app.use(passport.initialize());
		this.app.use(passport.session());
	}

	public async dbInit() {
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

	public async routes() {
		const router: express.Router = express.Router();

		this.app.use('/', router);
		this.app.use('/api/v1/user', UserController);
		this.app.use('/api/v1/register', RegisterController);
		this.app.use('/api/v1/login', LoginController);
		this.app.use('/api/v1/logout', LogoutController);
		this.app.use('/api/v1/token', TokenController);
		this.app.use('/api/v1/product', ProductController);
		passport.serializeUser((user, done) => {
			done(null, user);
		});

		passport.deserializeUser(async (id, done) => {
			try {
				const user = await getRepository(User).findOne(id, {
					select: ['id', 'name', 'email', 'role'],
				});

				done(null, user);
			} catch (error) {
				console.log('Error: ', error);
				done(error, false);
			}
		});
		this.app.use(
			(
				err: express.ErrorRequestHandler,
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				console.log(err);
				console.log(req);
				res.status(404).json({
					success: false,
					message: '404 - Page not found.',
				});

				return next();
			}
		);
	}
}

export default new Server().app;
