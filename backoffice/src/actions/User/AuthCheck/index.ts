import { USER_AUTH_CHECK, USER_AUTH_FAILURE } from '../../types';

const authUrl = `${process.env.REACT_APP_BACKEND_API_URL}/authCheck`;

export const userAuthCheck = (navigate: () => void) => async (
	dispatch: any
) => {
	const user = localStorage.getItem('user')
		? await JSON.parse(localStorage.getItem('user') || '')
		: null;
	if (user) {
		try {
			const request = await fetch(authUrl, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: user.token,
				},
			});

			if (request.status !== 200) {
				await localStorage.removeItem('user');

				dispatch({
					type: USER_AUTH_FAILURE,
					payload: {},
				});

				return navigate();
			}

			return dispatch({
				type: USER_AUTH_CHECK,
				payload: {},
			});
		} catch (error) {
			console.dir('Auth Check Error: ', error);
			await localStorage.removeItem('user');

			dispatch({
				type: USER_AUTH_FAILURE,
				payload: {},
			});

			return navigate();
		}
	}
};
