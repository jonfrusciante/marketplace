import * as dotenv from 'dotenv';
import * as escape from 'escape-html';

class Controller {
	constructor() {
		dotenv.config();
	}

	public formatSlug = (slug: string): string => {
		return this.escapeString(slug)
			.replace(/\s+/g, '-')
			.toLowerCase();
	};

	public escapeString = (str: string): string => {
		return escape(String(str));
	};
}

export { Controller };
