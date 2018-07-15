import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { User } from '../../models/User';
import { getRepository, Repository } from 'typeorm';

class UserController extends Controller {
	router: Router;
	db: Repository<User>;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', this.getUsers);
		this.router.get('/:id/:username?*', this.getUser);
		this.router.put('/:id/:username?*', this.updateUser);
		this.router.delete('/:id/:username?*', this.deleteUser);
	}

	public getUsers = async (_: any, res: Response): Promise<void> => {
		try {
			const response = await getRepository(User).find({
				select: ['id', 'firstName', 'lastName', 'username', 'email'],
				order: {
					username: 'DESC',
				},
			});

			console.log(response);

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

	public updateUser = async (req: Request, res: Response): Promise<void> => {
		const id: number = req.params.id;
		try {
			const response = await getRepository(User).update(id, {
				...req.body,
			});
			res.status(200).json({ success: true, response });

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
		const id: number = req.params.id;
		try {
			await getRepository(User).delete(id);

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
	};
}

const userController = new UserController();
userController.routes();
const controller = userController.router;

export { controller };
