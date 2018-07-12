import * as escape from 'escape-html';

class Controller {
	public escapeString = (str: any): string => {
		return escape(str);
	};
}

export default Controller;
