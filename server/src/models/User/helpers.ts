import { getRepository } from 'typeorm';

import { User } from '..';

export const getUserByEmail = async (email: string): Promise<User | null> => {
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
};
