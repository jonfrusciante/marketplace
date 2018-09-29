import * as argon2 from 'argon2';

export const hashPassword = async (
	password: Buffer
): Promise<string | null> => {
	const options = {
		timeCost: 4,
		memoryCost: 2 ** 13,
		parallelism: 2,
		type: argon2.argon2d,
	};

	try {
		const hash = await argon2.hash(password, options);

		return hash;
	} catch (error) {
		console.log(error);

		return null;
	}
};

export const verifyPassword = async (
	hash: string,
	password: string
): Promise<boolean> => {
	try {
		const verified = await argon2.verify(hash, password);

		return verified;
	} catch (error) {
		console.log(error);

		return false;
	}
};
