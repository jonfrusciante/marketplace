import * as jsonwebtoken from 'jsonwebtoken';

export const sign = (user: any) => {
	const timestamp = new Date().getTime();
	const { id } = user;
	return jsonwebtoken.sign(
		{ sub: id, iat: timestamp },
		String(process.env.JWT_SECRET),
		{
			expiresIn: '12h',
		}
	);
};

export const verify = (token: string) => {
	return jsonwebtoken.verify(token, String(process.env.JWT_SECRET));
};
