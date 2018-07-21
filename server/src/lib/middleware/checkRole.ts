import { Request, Response, NextFunction } from 'express';

export const roles = {
	Customer: 'Customer',
	Admin: 'Admin',
	Vendor: 'Vendor'
}

export const checkRole = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(req);
	if (req.user!.role === roles.Admin) {
		console.log('Is admin');
		return next();
	}

	if (req.user!.id === req.params.id) {
		console.log('Macthed id');
		return next();
	}

	console.log('Failed');
	res.status(403).json({ success: false, message: 'Access Denied.' });

	return;
}
