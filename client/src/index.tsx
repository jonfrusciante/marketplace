import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
let user = {};
if (localStorage.getItem('user')) {
	user = JSON.parse(localStorage.getItem('user') || '');
}

ReactDOM.render(
	<Provider store={store}>
		<App user={user} />
	</Provider>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
