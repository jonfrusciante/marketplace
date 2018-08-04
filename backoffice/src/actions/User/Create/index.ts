import { USER_AUTH, USER_AUTH_FAILURE } from '../../types';

const registerUrl = `${process.env.REACT_APP_BACKEND_API_URL}/register`;

export const userCreate = (formValues: any, navigate: () => void) => async (
	dispatch: any
) => {
	try {
		const request = await fetch(registerUrl, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			body: JSON.stringify(formValues),
		});
		const { response } = await request.json();

		await localStorage.setItem('user', JSON.stringify(response));

		dispatch({
			type: USER_AUTH,
			payload: response,
		});

		navigate();
	} catch (error) {
		console.log('Register Error: ', error);

		return dispatch({
			type: USER_AUTH_FAILURE,
			payload: {},
		});
	}
};
