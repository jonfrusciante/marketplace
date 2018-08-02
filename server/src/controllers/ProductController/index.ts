import { Controller } from '../Controller';
import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Product } from '../../models';
import requireLogin from '../../lib/middleware/requireLogin';
import { roles } from '../../lib/middleware/checkRole';

class ProductController extends Controller {
	router: Router;

	constructor() {
		super();

		this.router = Router();
		this.routes();
	}

	routes() {
		this.router.get('/', this.getProducts);
		this.router.get('/user/:id', this.getUserProducts);
		this.router.get('/:slug', this.getProduct);
		this.router.put('/:slug', requireLogin, this.updateProduct);
		this.router.delete('/:slug', requireLogin, this.deleteProduct);
	}

	public getProduct = async (req: Request, res: Response): Promise<void> => {
		try {
			const slug = this.escapeString(req.params.slug);
			const sql = `SELECT p.id, p.name, p.vendorId, p.slug, JSON_ARRAYAGG(JSON_OBJECT('id', sku.id, 'name', sku.name, 'price', sku.price, 'slug', sku.slug, 'description', sku.description)) AS productSkus FROM product AS p LEFT JOIN productSku AS sku ON p.id = sku.productId WHERE p.slug = ?`;
			const product = await getRepository(Product).query(sql, [slug]);
			if (typeof product !== 'undefined') {
				const skus = JSON.parse(product[0].productSkus);
				delete product[0].productSkus;

				const response = { ...product[0], skus };

				res.status(200).json({
					response,
					message: 'Success',
				});

				return;
			}

			res.status(404).json({
				response: {},
				message: 'Product not found.',
			});

			return;
		} catch (error) {
			console.error(error);
			res.status(404).json({
				response: {},
				message: 'Product not found',
			});

			return;
		}
	};

	public getProducts = async (_: Request, res: Response): Promise<void> => {
		try {
			const sql = `SELECT p.id, p.name, p.vendorId, p.slug, JSON_ARRAYAGG(JSON_OBJECT('id', sku.id, 'name', sku.name, 'price', sku.price, 'slug', sku.slug, 'description', sku.description)) AS productSkus FROM product AS p LEFT JOIN productSku AS sku ON p.id = sku.productId GROUP BY p.id`;
			const products = await getRepository(Product).query(sql);
			if (typeof products !== 'undefined') {
				const response = products.map((p: any) => {
					return {
						id: p.id,
						name: p.name,
						vendorId: p.vendorId,
						slug: p.slug,
						skus: JSON.parse(p.productSkus),
					};
				});

				res.status(200).json({
					response,
					message: 'Success',
				});

				return;
			}

			res.status(404).json({
				response: {},
				message: 'Products not found.',
			});

			return;
		} catch (error) {
			console.error(error);
			res.status(404).json({
				response: {},
				message: 'Products not found',
			});

			return;
		}
	};

	public getUserProducts = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			if (req.user) {
				const vendorId = req.params.id;
				const sql = `SELECT p.id, p.name, p.vendorId, p.slug, JSON_ARRAYAGG(JSON_OBJECT('id', sku.id, 'name', sku.name, 'price', sku.price, 'slug', sku.slug, 'description', sku.description)) AS productSkus FROM product AS p LEFT JOIN productSku AS sku ON p.id = sku.productId WHERE vendorId = ? GROUP BY p.id`;
				const products = await getRepository(Product).query(sql, [
					vendorId,
				]);
				if (typeof products !== 'undefined') {
					const response = products.map((p: any) => {
						return {
							id: p.id,
							name: p.name,
							vendorId: p.vendorId,
							slug: p.slug,
							skus: JSON.parse(p.productSkus),
						};
					});

					res.status(200).json({
						response,
						message: 'Success',
					});

					return;
				}
			}
			res.status(400).json({ response: {}, message: 'You must login.' });

			return;
		} catch (error) {
			console.log(error);
			res.status(500).json({
				response: {},
				message: 'Something went wrong, please try again.',
			});

			return;
		}
	};

	public updateProduct = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const slug = this.escapeString(req.params.slug);
			const product = await getRepository(Product).findOne({ slug });

			if (
				req.user!.role !== roles.Admin &&
				req.user!.id !== product!.vendorId
			) {
				res.status(403).json({
					response: {},
					message: 'Access Denied.',
				});

				return;
			}

			if (typeof product !== 'undefined') {
				for (const key in req.body) {
					if (/\S/.test(req.body[key])) {
						product![key] = this.escapeString(req.body[key]);
						if (key === 'slug') {
							product![key] = this.formatSlug(req.body[key]);
						}
					}
				}

				const response = await getRepository(Product).update(
					{ slug },
					product
				);

				res.status(200).json({
					response,
					message: 'Success',
				});

				return;
			}

			res.status(404).json({
				response: {},
				message: 'Product not found.',
			});

			return;
		} catch (error) {
			console.error(error);
			res.status(404).json({
				response: {},
				message: 'Product not found',
			});

			return;
		}
	};

	public deleteProduct = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const slug = this.escapeString(req.params.slug);
			const product = await getRepository(Product).findOne({ slug });

			if (typeof product !== 'undefined') {
				if (
					req.user!.role !== roles.Admin &&
					req.user!.id !== product!.vendorId
				) {
					res.status(403).json({
						response: {},
						message: 'Access Denied.',
					});

					return;
				}

				await product.remove();

				res.status(200).json({
					response: {},
					message: 'Product sucessfully deleted.',
				});

				return;
			}

			res.status(404).json({
				response: {},
				message: 'Product not found.',
			});

			return;
		} catch (error) {
			res.status(500).json({
				response: {},
				message: 'Something went wrong, please try again.',
			});

			return;
		}
	};
}

const productController = new ProductController();
productController.routes();
const controller = productController.router;

export { controller };
