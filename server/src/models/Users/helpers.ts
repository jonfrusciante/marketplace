import { getRepository } from 'typeorm';

import { Users } from '..';

export const getUserByEmail = async (email: string): Promise<Users | null> => {
	try {
		const user = await getRepository(Users).findOne({
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
