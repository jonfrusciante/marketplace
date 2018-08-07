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
			console.log('Category Payload: ', payload);
			console.log('Category State: ', state);
			return {};
		case GET_CATEGORIES:
			console.log('Category Payload: ', payload);
			console.log('Category State: ', state);
			return { ...state, ...payload };
		case CREATE_CATEGORY:
			console.log('Category Payload: ', payload);
			console.log('Category State: ', state);
			return {};
		case UPDATE_CATEGORY:
			console.log('Category Payload: ', payload);
			console.log('Category State: ', state);
			return {};
		case DELETE_CATEGORY:
			console.log('Category Payload: ', payload);
			console.log('Category State: ', state);
			return {};
		case CATEGORY_FAILURE:
			console.log('Category Payload: ', payload);
			console.log('Category State: ', state);
			return {};
		default:
			return state;
	}
};
