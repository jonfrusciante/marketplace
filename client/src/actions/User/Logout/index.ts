import { USER_LOGOUT } from '../../types';

export const userLogout = (navigate: () => void) => async (dispatch: any) => {
	await localStorage.removeItem('user');

	dispatch({ type: USER_LOGOUT });

	navigate();
};
