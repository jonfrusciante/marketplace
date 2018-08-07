import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Category } from '../../models';
import requireLogin from '../../lib/middleware/requireLogin';
import { roles } from '../../lib/middleware/checkRole';
import * as messages from '../../lib/helpers/messages';

class CategoryController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', this.getCategories);
		this.router.get('/:id', this.getCategory);
		this.router.post('/', requireLogin, this.createCategory);
		this.router.put('/:id', requireLogin, this.updateCategory);
		this.router.delete('/:id', requireLogin, this.deleteCategory);
	}

	public createCategory = async (
		req: Request,
		res: Response
	): Promise<void> => {
		if (req.user!.role !== roles.Admin) {
			res.status(403).json(messages.error403);

			return;
		}

		const category = new Category();
		for (const key in req.body) {
			if (/\S/.test(req.body[key])) {
				category[key] = this.escapeString(req.body[key]);
			}
		}

		console.log('Category: ', req.body);

		try {
			const response = await getRepository(Category).save(category);

			res.status(200).json({
				response,
				message: 'Success',
			});

			return;
		} catch (error) {
			console.error(error);
			res.status(500).json(messages.error500);

			return;
		}
	};

	public getCategory = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = this.escapeString(req.params.id);
			const category = await getRepository(Category).findOne({ id });
			if (typeof category !== 'undefined') {
				res.status(200).json({
					response: category,
					message: 'Success',
				});

				return;
			}

			res.status(404).json({
				response: {},
				message: 'Category not found.',
			});

			return;
		} catch (error) {
			console.error(error);
			res.status(404).json({
				response: {},
				message: 'Category not found',
			});

			return;
		}
	};

	public getCategories = async (_: Request, res: Response): Promise<void> => {
		try {
			const categories = await getRepository(Category).find();
			if (typeof categories !== 'undefined') {
				res.status(200).json({
					response: categories,
					message: 'Success',
				});

				return;
			}

			res.status(404).json({
				response: {},
				message: 'Categories not found.',
			});

			return;
		} catch (error) {
			console.error(error);
			res.status(404).json({
				response: {},
				message: 'Categories not found',
			});

			return;
		}
	};

	public updateCategory = async (
		req: Request,
		res: Response
	): Promise<void> => {
		if (req.user!.role !== roles.Admin) {
			res.status(403).json(messages.error403);

			return;
		}

		try {
			const id = this.escapeString(req.params.id);
			const category = await getRepository(Category).findOne({ id });

			if (typeof category !== 'undefined') {
				for (const key in req.body) {
					if (/\S/.test(req.body[key])) {
						category![key] = this.escapeString(req.body[key]);
					}
				}

				await getRepository(Category).update({ id }, category);

				res.status(200).json({
					response: category,
					message: 'Success',
				});

				return;
			}

			res.status(404).json({
				response: {},
				message: 'Category not found.',
			});

			return;
		} catch (error) {
			console.error(error);
			res.status(404).json({
				response: {},
				message: 'Category not found',
			});

			return;
		}
	};

	public deleteCategory = async (
		req: Request,
		res: Response
	): Promise<void> => {
		if (req.user!.role !== roles.Admin) {
			res.status(403).json(messages.error403);

			return;
		}

		const id = this.escapeString(req.params.id);
		const category = await getRepository(Category).findOne({ id });
		if (typeof category !== 'undefined') {
			try {
				await category.remove();

				res.status(200).json({
					response: {},
					message: 'Category sucessfully deleted.',
				});

				return;
			} catch (error) {
				res.status(500).json(messages.error500);

				return;
			}
		}

		res.status(404).json({
			response: {},
			message: 'Category not found.',
		});

		return;
	};
}

const categoryController = new CategoryController();
categoryController.routes();
const controller = categoryController.router;

export { controller };
