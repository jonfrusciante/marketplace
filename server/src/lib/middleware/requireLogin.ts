import { Request, Response, NextFunction } from 'express';

export const requireLogin = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		return next();
	}

	res.status(403).json({ success: false, message: 'Access Denied.' });

	return;
}
