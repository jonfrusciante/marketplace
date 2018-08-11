import { USER_AUTH_CHECK, USER_AUTH_FAILURE } from '../../types';
import userToken from '../../../helpers/getUserToken';

const authUrl = `${process.env.REACT_APP_BACKEND_API_URL}/authCheck`;

export const userAuthCheck = () => async (
	dispatch: any
) => {
	if (userToken) {
		try {
			const request = await fetch(authUrl, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: userToken,
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
