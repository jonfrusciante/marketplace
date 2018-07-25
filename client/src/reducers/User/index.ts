import { combineReducers } from 'redux';

import { UserLoginReducer } from './Login';
import { UserRegisterReducer } from './Register';

export default combineReducers({
	...UserLoginReducer,
	...UserRegisterReducer,
});
