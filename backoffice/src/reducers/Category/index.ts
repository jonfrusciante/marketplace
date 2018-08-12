import {
	GET_CATEGORY,
	GET_CATEGORIES,
	CREATE_CATEGORY,
	UPDATE_CATEGORY,
	DELETE_CATEGORY,
	CATEGORY_FAILURE,
} from '../../actions/types';

export default (state: object = {}, { type, payload }: any): object => {
	switch (type) {
		case GET_CATEGORY:
			return { ...state, ...payload };
		case GET_CATEGORIES:
			return { ...state, ...payload };
		case CREATE_CATEGORY:
			return { ...state, ...payload };
		case UPDATE_CATEGORY:
			return { ...state, ...payload };
		case DELETE_CATEGORY:
			return { ...state, ...payload };
		case CATEGORY_FAILURE:
			return { ...state, ...payload };
		default:
			return state;
	}
};