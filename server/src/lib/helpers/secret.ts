import * as crypto from 'crypto';
import * as uuid from 'uuid/v4';

export const createSecret = (length: number) => {
	const privateKey = uuid();

	const publicKey = crypto
		.createHmac('sha256', privateKey)
		.update('XSRF-TOKEN')
		.digest('hex');

	let nonce = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		nonce += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return `${nonce}${publicKey}`;
};

export const verifySecret = (
	publicKey: string,
	privateKey: string,
	token: string
): boolean => {
	console.log(publicKey);
	console.log(privateKey);
	console.log(token);
	return true;
};
