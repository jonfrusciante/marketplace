import { GET_CATEGORIES, CATEGORY_FAILURE } from '../../types';

const categoryUrl = `${process.env.REACT_APP_BACKEND_API_URL}/category`;

export const getCategories = () => async (dispatch: any) => {
	try {
		const request = await fetch(categoryUrl, {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		});
		const { response } = await request.json();
		console.log('Category Response: ', response);

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
