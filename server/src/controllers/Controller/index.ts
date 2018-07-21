import * as dotenv from 'dotenv';
import { getRepository } from 'typeorm';
import { User } from '../../models';

class Controller {
	constructor() {
		dotenv.config();
	}

	public formatSlug = (slug: string): string => {
		return this.escapeString(slug).replace(/\s+/g, '-').toLowerCase();
	}

	public escapeString = (str: string): string => {
		return escape(String(str));
	}

	public getUserByEmail = async (email: string): Promise<User | null> => {
		try {
			const user = await getRepository(User).findOne({
				where: { email },
			});

			if (typeof user === 'undefined') {
				return null;
			}

			return user;
		} catch (error) {
			console.error(error);

			return null;
		}
	}

	public getUserByUsername = async (username: string): Promise<User | null> => {
		try {
			const user = await getRepository(User).findOne({
				where: { username },
			});

			if (typeof user === 'undefined') {
				return null;
			}

			return user;
		} catch (error) {
			console.error(error);

			return null;
		}
	}
}

export { Controller };
