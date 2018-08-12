import {
	UPDATE_CATEGORY,
	CATEGORY_FAILURE,
	USER_AUTH_FAILURE,
} from '../../types';

import { category } from '../../endpoints';
import { Category } from '../../../containers/Categories/types';
import userToken from '../../../helpers/getUserToken';

export const updateCategory = (
	formValues: Partial<Category>,
	id: string,
	navigate: () => void
) => async (dispatch: any) => {
	if (userToken) {
		try {
			const request = await fetch(`${category}/${id}`, {
				method: 'PUT',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: userToken,
				},
				body: JSON.stringify(formValues),
			});
			const { response } = await request.json();

			dispatch({
				type: UPDATE_CATEGORY,
				payload: response,
			});

			return navigate();
		} catch (error) {
			console.dir('Category Update Error: ', error);

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