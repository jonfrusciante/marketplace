import {
	USER_REGISTER,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
} from '../../../actions/types';
import { RegisterResponse } from '../../../actions/User/Register';

const initialState = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user') || '')
	: {};

export interface RegisterReducerActions {
	readonly type: string;
	readonly payload: RegisterResponse;
}

export interface RegisterReducerState {
	readonly state: string;
}

export const UserRegisterReducer = (
	state: RegisterReducerState = initialState,
	{ type, payload }: RegisterReducerActions
): RegisterResponse | RegisterReducerState => {
	switch (type) {
		case USER_REGISTER:
			return payload;
		case USER_REGISTER_SUCCESS:
			const { id, email, name } = payload;
			console.log(id);
			console.log(email);
			console.log(name);
			return { id, email, name };
		case USER_REGISTER_FAILURE:
			return payload;
		default:
			return state;
	}
};
