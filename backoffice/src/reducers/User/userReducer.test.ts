import userReducer from './index';
import { USER_AUTH, USER_AUTH_FAILURE, USER_LOGOUT } from '../../actions/types';

it('handles actions of type USER_AUTH', () => {
	const payload = {
		id: '1',
		name: 'Duran',
		email: 'duran@gmail.com',
		token: 'j9302ns0ns92n#()#()',
	};
	const action = {
		type: USER_AUTH,
		payload,
	};

	const newState = userReducer({}, action);

	expect(newState).toEqual(payload);
});

it('handles actions of type USER_AUTH_FAILURE', () => {
	const payload = { error: 'Error occured' };
	const action = { type: USER_AUTH_FAILURE, payload };

	const newState = userReducer({}, action);

	expect(newState).toEqual(payload);
});

it('handles actions of type USER_LOGOUT', () => {
	const payload = {
		id: '1',
		name: 'Duran',
		email: 'duran@gmail.com',
		token: 'j9302ns0ns92n#()#()',
	};
	const action = { type: USER_LOGOUT };

	const newState = userReducer(payload, action);

	expect(newState).toEqual({});
});

it('handles action with unknown type', () => {
	const newState = userReducer({}, {});

	expect(newState).toEqual({});
});
