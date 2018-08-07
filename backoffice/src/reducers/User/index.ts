import {
	USER_AUTH,
	USER_AUTH_CHECK,
	USER_LOGOUT,
	USER_AUTH_FAILURE,
} from '../../actions/types';

const initialState = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user') || '')
	: {};

export default (
	state: object = initialState,
	{ type, payload }: any
): object => {
	switch (type) {
		case USER_AUTH:
			return { ...state, ...payload };
		case USER_AUTH_CHECK:
			return state;
		case USER_LOGOUT:
			return {};
		case USER_AUTH_FAILURE:
			return payload;
		default:
			return state;
	}
};
