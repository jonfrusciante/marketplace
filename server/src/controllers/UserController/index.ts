import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../../models';
import { requireLogin } from '../../lib/middleware/requireLogin';

class UserController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', this.getUsers);
		this.router.get('/:username', this.getUser);
		this.router.put('/:username', requireLogin, this.updateUser);
		this.router.delete('/:username', requireLogin, this.deleteUser);
	}

	public getUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const username = this.escapeString(req.params.username);
			const response = await getRepository(User).findOne({
				select: [
					'id',
					'firstName',
					'lastName',
					'username',
					'email',
					'DOB',
					'gender',
				],
				where: { username },
			});

			res.status(200).json({ success: true, response });

			return;
		} catch (error) {
			res.status(404).json({
				success: false,
				errors: error.message,
				message: 'User not found',
			});
			console.error(error);

			return;
		}
	};

	public getUsers = async (_: Request, res: Response): Promise<void> => {
		try {
			const response = await getRepository(User).find({
				select: [
					'id',
					'firstName',
					'lastName',
					'username',
					'email',
					'DOB',
					'gender',
				],
				order: {
					username: 'DESC',
				},
			});

			res.status(200).json({ success: true, response });

			return;
		} catch (error) {
			res.status(404).json({
				success: false,
				errors: error.message,
				message: 'Users not found',
			});
			console.error(error);

			return;
		}
	}

	public updateUser = async (req: Request, res: Response): Promise<void> => {
		const username: string = req.params.username;
		try {
			// Check if user can perform this action
			if (!req.user || req.user.username !== username) {
				res.status(403).json({
					success: false,
					message: 'You cannot perform this action.',
				});

				return;
			}

			const data = {};
			for (const key in req.body) {
				if (/\S/.test(req.body[key])) {
					data[key] = this.escapeString(req.body[key]);
					if (key === 'email') {
						data[key] = this.escapeString(req.body[key]).toLowerCase();
					}
					if (key === 'username') {
						data[key] = this.escapeString(req.body[key]).toLowerCase().replace(/\s/g, '');
					}
				}
			}

			try {
				await getRepository(User).update({ username }, data);
			} catch (error) {
				res.status(500).json({
					success: false,
					errors: error.message,
					message: 'Something went wrong, please try again.',
				});
				console.log(error);

				return;
			}

			res.status(200).json({ success: true, message: 'User updated sucessfully.' });

			return;
		} catch (error) {
			res.status(401).json({
				success: false,
				errors: error.message,
				message: 'You are not allowed to perform this action',
			});
			console.error(error);

			return;
		}
	};

	public deleteUser = async (req: Request, res: Response): Promise<void> => {
		const username: string = req.params.username;
		try {
			await getRepository(User).delete({ username });

			res.status(200).json({
				success: true,
				message: 'User successfully deleted',
			});

			return;
		} catch (error) {
			res.status(401).json({
				success: false,
				errors: error.message,
				message: 'You are not allowed to perform this action',
			});
			console.error(error);

			return;
		}
	}
}

const userController = new UserController();
userController.routes();
const controller = userController.router;

export { controller };
