import Controller from './Controller';
import * as argon2 from 'argon2';
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../db';

import requireLogin from '../lib/middleware/requireLogin';

class UserController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	private async hashPassword(password: Buffer): Promise<string> {
		const options = {
			timeCost: 4,
			memoryCost: 2 ** 13,
			parallelism: 2,
			type: argon2.argon2d,
		};

		const hash = await argon2.hash(password, options);

		return hash;
	}

	private async verifyPassword(
		hash: string,
		password: string
	): Promise<boolean> {
		try {
			if (await argon2.verify(hash, password)) {
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log(err);
		}
	}

	public async getUser(req: Request, res: Response): Promise<void> {
		const id: number = req.params.id;
		try {
			let user = await User.findOne({
				where: { id },
			});
			res.status(200).json({ user });
		} catch (error) {
			res.status(404).json('Not Found');
			console.error(error);
		}
	}

	public async getUsers(req: Request, res: Response): Promise<void> {
		try {
			let users = await User.findAll({ order: [['username', 'DESC']] });
			res.status(200).json({ users });
		} catch (error) {
			res.status(404).json('Not found');
			console.error(error);
		}
	}

	public async updateUser(req: Request, res: Response): Promise<void> {
		const id: number = req.params.id;
		try {
			let user = await User.update(req.body, { where: { id } });
			res.status(200).json({ user });
		} catch (error) {
			res.status(403).json('You are not allowed to perform this action');
			console.error(error);
		}
	}

	public async deleteUser(req: Request, res: Response): Promise<void> {
		const id: number = req.params.id;
		try {
			await User.destroy({ where: { id } });
			res.status(200);
		} catch (error) {
			res.status(403).json('You are not allowed to perform this action');
			console.error(error);
		}
	}

	routes() {
		this.router.get('/', this.getUsers);
		this.router.get('/:id/:username?*', this.getUser);
		this.router.put('/:id/:username?*', requireLogin, this.updateUser);
		this.router.delete('/:id/:username?*', requireLogin, this.deleteUser);
	}
}

const userController = new UserController();
userController.routes();

export default userController.router;
