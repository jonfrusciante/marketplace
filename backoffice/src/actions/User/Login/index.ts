import { USER_AUTH, USER_AUTH_FAILURE } from '../../types';

const loginUrl = `${process.env.REACT_APP_BACKEND_API_URL}/login`;

export const userLogin = (formValues: any, navigate: () => void) => async (
	dispatch: any
) => {
	try {
		const { email, password } = formValues;
		const request = await fetch(loginUrl, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify({ email, password }),
		});
		const { response, message } = await request.json();
		if (request.status !== 200) {
			return dispatch({
				type: USER_AUTH_FAILURE,
				payload: { message },
			});

			return;
		}

		await localStorage.setItem('user', JSON.stringify(response));

		dispatch({
			type: USER_AUTH,
			payload: response,
		});

		navigate();
	} catch (error) {
		console.dir('Login Error: ', error);

		return dispatch({
			type: USER_AUTH_FAILURE,
			payload: {},
		});
	}
};
