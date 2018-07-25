import axios from 'axios';
import * as constants from '../../../constants';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAILURE } from '../../types';

const loginUrl = `${constants.BACKEND_API_URL}/login`;

export interface UserLogin {
	email: string;
	password: string;
}

export interface LoginResponse {
	id: string;
	name: string;
	email: string;
}

const loginSuccess = (response: any): any => {
	console.log('User Login Action Response: ', response);
	return {
		type: USER_LOGIN_SUCCESS,
		payload: response,
	};
};

const loginFailure = (error: any): any => {
	console.log('User Login Action Error: ', error);
	return {
		type: USER_LOGIN_FAILURE,
		payload: error,
	};
};

export const userLogin = ({
	email: userEmail,
	password: userPassword,
}: UserLogin): any => {
	return async (dispatch: any) => {
		try {
			const response = await axios({
				url: loginUrl,
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
			const loggedInUser = {
				id,
				name,
				email,
			};
			localStorage.setItem('user', JSON.stringify(loggedInUser));

			return dispatch(loginSuccess(response.data));
		} catch (error) {
			console.log('Login Error: ', error);

			return dispatch(loginFailure(error));
		}
	};
};
