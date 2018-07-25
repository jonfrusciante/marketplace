import axios from 'axios';
import * as constants from '../../../constants';
import { USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE } from '../../types';

const registerUrl = `${constants.BACKEND_API_URL}/register`;

export interface UserRegister {
	email: string;
	password: string;
}

export interface RegisterResponse {
	id: string;
	name: string;
	email: string;
}

export interface RegisterActionResponse {
	readonly type: string;
	payload: object;
}

const registerSuccess = (
	response: RegisterResponse
): RegisterActionResponse => {
	console.log('User Register Action Response: ', response);
	return {
		type: USER_REGISTER_SUCCESS,
		payload: response,
	};
};

const registerFailure = (error: object): RegisterActionResponse => {
	console.log('User Register Action Error: ', error);
	return {
		type: USER_REGISTER_FAILURE,
		payload: error,
	};
};

export const userRegister = ({
	email: userEmail,
	password: userPassword,
}: UserRegister): any => {
	return async (dispatch: any) => {
		try {
			const response = await axios({
				url: registerUrl,
				method: 'POST',
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					email: userEmail,
					password: userPassword,
				},
			});
			const { id, name, email } = response.data.response;
			const registeredInUser = { id, name, email };
			localStorage.setItem('user', JSON.stringify(registeredInUser));

			return dispatch(registerSuccess(response.data));
		} catch (error) {
			console.log('Register Error: ', error);

			return dispatch(registerFailure(error));
		}
	};
};
