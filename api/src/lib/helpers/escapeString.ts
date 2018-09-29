import * as escape from 'escape-html';

export const escapeString = (str: string): string => {
	return escape(String(str));
};
