import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Users } from '../../models';
import requireLogin from '../../lib/middleware/requireLogin';
import * as messages from '../../lib/helpers/messages';

class UserController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', this.getUsers);
		this.router.get('/:id', this.getUser);
		this.router.put('/:id', requireLogin, this.updateUser);
		this.router.delete('/:id', requireLogin, this.deleteUser);
	}

	public getUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = this.escapeString(req.params.id);
			const response = await getRepository(Users).findOne({
				select: ['id', 'name', 'email'],
				where: { id },
			});

			res.status(200).json({ response, message: 'Success' });

			return;
		} catch (error) {
			console.log(error);
			res.status(404).json({
				response: {},
				message: 'User not found',
			});

			return;
		}
	};

	public getUsers = async (_: Request, res: Response): Promise<void> => {
		try {
			const response = await getRepository(Users).find({
				select: ['id', 'name', 'email'],
				order: {
					name: 'DESC',
				},
			});

			res.status(200).json({ response, message: 'Success' });

			return;
		} catch (error) {
			console.log(error);
			res.status(404).json({
				response: {},
				message: 'Users not found',
			});

			return;
		}
	};

	public updateUser = async (req: Request, res: Response): Promise<void> => {
		const id: string = req.params.id;
		try {
			// Check if user can perform this action
			if (!req.user || req.user.id !== id) {
				res.status(403).json(messages.error403);

				return;
			}

			const data = {};
			for (const key in req.body) {
				if (/\S/.test(req.body[key])) {
					data[key] = this.escapeString(req.body[key]);
					if (key === 'email') {
						data[key] = this.escapeString(
							req.body[key]
						).toLowerCase();
					}
				}
			}

			try {
				const response = await getRepository(Users).update(
					{ id },
					data
				);

				res.status(200).json({
					response,
					message: 'User updated sucessfully.',
				});
			} catch (error) {
				console.log(error);
				res.status(500).json(messages.error500);

				return;
			}

			return;
		} catch (error) {
			console.log(error);
			res.status(403).json(messages.error403);

			return;
		}
	};

	public deleteUser = async (req: Request, res: Response): Promise<void> => {
		const id: string = req.params.id;
		try {
			await getRepository(Users).delete({ id });

			res.status(200).json({
				response: {},
				message: 'User successfully deleted',
			});

			return;
		} catch (error) {
			console.log(error);
			res.status(403).json(messages.error403);

			return;
		}
	};
}

const userController = new UserController();
userController.routes();
const controller = userController.router;

export { controller };
