import {
	CREATE_CATEGORY,
	CATEGORY_FAILURE,
	USER_AUTH_FAILURE,
} from '../../types';
import userToken from '../../../helpers/getUserToken';

const categoryUrl = `${process.env.REACT_APP_BACKEND_API_URL}/category`;

export const createCategory = (formValues: any, navigate: () => void) => async (
	dispatch: any
) => {
	if (userToken) {
		try {
			const request = await fetch(categoryUrl, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: userToken,
				},
				body: JSON.stringify(formValues),
			});
			const { response } = await request.json();
			console.log('Cat create: ', response);

			dispatch({
				type: CREATE_CATEGORY,
				payload: response,
			});

			return navigate();
		} catch (error) {
			console.dir('Category Creation Error: ', error);

			return dispatch({
				type: CATEGORY_FAILURE,
				payload: {},
			});
		}
	}

	return dispatch({
		type: USER_AUTH_FAILURE,
		payload: {},
	});
};
