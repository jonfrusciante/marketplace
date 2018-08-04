import { USER_AUTH, USER_LOGOUT, USER_AUTH_FAILURE } from '../../actions/types';

const initialState = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user') || '')
	: {};

export default (state: any = initialState, { type, payload }: any): any => {
	switch (type) {
		case USER_AUTH:
			return { ...state, ...payload };
		case USER_LOGOUT:
			return {};
		case USER_AUTH_FAILURE:
			return payload;
		default:
			return state;
	}
};