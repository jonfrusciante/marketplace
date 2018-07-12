import Controller from './Controller';
import { Router, Request, Response } from 'express';
import { User } from '../db';

class UserController extends Controller {
	router: Router;

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

	public getUser = async (req: Request, res: Response): Promise<void> => {
		const id: number = req.params.id;
		try {
			const response = await User.findOne({
				where: { id },
			});
			res.status(200).json({ success: true, response });

			return;
		} catch (error) {
			res.status(404).json({ success: false, errors: error.message, message: 'User not found' });
			console.error(error);

			return
		}
	};

	public getUsers = async (res: Response): Promise<void> => {
		try {
			const response = await User.findAll({ order: [['username', 'DESC']] });
			res.status(200).json({ success: true, response });

			return;
		} catch (error) {
			res.status(404).json({ success: false, errors: error.message, message: 'User not found' });
			console.error(error);

			return;
		}
	};

	public updateUser = async (req: Request, res: Response): Promise<void> => {
		const id: number = req.params.id;
		try {
			const response = await User.update(req.body, { where: { id } });
			res.status(200).json({ success: true, response });

			return;
		} catch (error) {
			res.status(401).json({ success: false, errors: error.message, message: 'You are not allowed to perform this action' });
			console.error(error);

			return;
		}
	};

	public deleteUser = async (req: Request, res: Response): Promise<void> => {
		const id: number = req.params.id;
		try {
			await User.destroy({ where: { id } });
			res.status(200).json({ success: true,  message: 'User successfully deleted' });

			return;
		} catch (error) {
			res.status(401).json({ success: false, errors: error.message, message: 'You are not allowed to perform this action' });
			console.error(error);

			return;
		}
	};
}

const userController = new UserController();
userController.routes();
const controller = userController.router;

export {controller};
