import { GET_CATEGORIES, CATEGORY_FAILURE } from '../../types';

import { category } from '../../endpoints';

export const getCategories = () => async (dispatch: any) => {
	try {
		const request = await fetch(category, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		const { response } = await request.json();

		return dispatch({
			type: GET_CATEGORIES,
			payload: response,
		});
	} catch (error) {
		console.dir('Category Creation Error: ', error);

		return dispatch({
			type: CATEGORY_FAILURE,
			payload: {},
		});
	}
};