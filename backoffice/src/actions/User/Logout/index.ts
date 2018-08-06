import { USER_LOGOUT, USER_LOGOUT_FAILURE } from '../../types';

const logoutUrl = `${process.env.REACT_APP_BACKEND_API_URL}/logout`;

export const userLogout = (navigate: () => void) => async (dispatch: any) => {
	const { token } = JSON.parse(localStorage.getItem('user') || '');

	try {
		await fetch(logoutUrl, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				authorization: token,
			},
		});

		await localStorage.removeItem('user');

		dispatch({ type: USER_LOGOUT });

		return navigate();
	} catch (error) {
		console.dir('Logout Error: ', error);

		return dispatch({ type: USER_LOGOUT_FAILURE });
	}
};