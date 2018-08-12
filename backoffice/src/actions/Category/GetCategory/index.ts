import { GET_CATEGORY, CATEGORY_FAILURE } from '../../types';

import { category } from '../../endpoints';

export const getCategory = (id: string) => async (dispatch: any) => {
	try {
		const request = await fetch(`${category}/${id}`, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		const { response } = await request.json();

		return dispatch({
			type: GET_CATEGORY,
			payload: response,
		});
	} catch (error) {
		console.dir('Category Get Error: ', error);

		return dispatch({
			type: CATEGORY_FAILURE,
			payload: {},
		});
	}
};
