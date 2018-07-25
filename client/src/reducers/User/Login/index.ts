import {
	USER_LOGIN,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
} from '../../../actions/types';
import { LoginResponse } from '../../../actions/User/Login';

const initialState = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user') || '')
	: {};

export interface LoginReducerActions {
	readonly type: string;
	readonly payload: LoginResponse;
}

export interface LoginReducerState {
	state: object;
}

export const UserLoginReducer = (
	state: LoginReducerState = initialState,
	{ type, payload }: LoginReducerActions
): LoginResponse | LoginReducerState => {
	switch (type) {
		case USER_LOGIN:
			return payload;
		case USER_LOGIN_SUCCESS:
			const { id, email, name } = payload;
			const response: LoginResponse = { id, email, name };
			return response;
		case USER_LOGIN_FAILURE:
			return payload;
		default:
			return state;
	}
};
