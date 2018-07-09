import { Response } from 'express';
import * as escape from 'escape-html';

interface Controller {
	// name: string;
}

class Controller {
	constructor() {
		console.warn('HIHIHIIHIIHHIHIHIHIHIH');
	}

	public escapeString = (str: any): string => {
		return escape(str);
	};

	public validate = (data: any): boolean => {
		let properties = {};

		for (let key in data) {
			properties = data[key];
		}

		console.log(properties);

		return true;
	};

	public handleError = (error: any, response: Response) => {
		if (response !== null) {
			response.status(403).json({ error });

			return;
		}

		throw new Error(error.message);
	};
}

// switch(req.body) {
// 	case first_name === '':
// 	res.status(403).json({
// 		message: 'Please enter your first name',
// 	});

// 	return;
// 	case last_name === '':
// 	res.status(403).json({
// 		message: 'Please enter your last name',
// 	});

// 	return;
// 	case username === '':
// 	res.status(403).json({
// 		message: 'Please enter a username',
// 	});

// 	return;
// 	case email === '':
// 	res.status(403).json({
// 		message: 'Please enter your email',
// 	});

// 	return;
// 	case password === '':
// 	res.status(403).json({
// 		message: 'Please enter a password',
// 	});

// 	return;
// }

export default Controller;
