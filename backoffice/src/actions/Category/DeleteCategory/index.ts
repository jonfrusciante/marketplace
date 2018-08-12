import {
	DELETE_CATEGORY,
	CATEGORY_FAILURE,
	USER_AUTH_FAILURE,
} from '../../types';

import userToken from '../../../helpers/getUserToken';
import { category } from '../../endpoints';

export const deleteCategory = (id: string) => async (dispatch: any) => {
	if (userToken) {
		try {
			const request = await fetch(`${category}/${id}`, {
				method: 'DELETE',
				mode: 'cors',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
					authorization: userToken,
				},
			});
			const { response } = await request.json();

			return dispatch({
				type: DELETE_CATEGORY,
				payload: response,
			});
		} catch (error) {
			console.dir('Category Delete Error: ', error);

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