import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './App';
import ErrorBoundary from './ErrorBoundary';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
let user = {};
if (localStorage.getItem('user')) {
	user = JSON.parse(localStorage.getItem('user') || '');
}

ReactDOM.render(
	<ErrorBoundary>
		<Provider store={store}>
			<App user={user} />
		</Provider>
	</ErrorBoundary>,
	document.getElementById('root') as HTMLElement
);
registerServiceWorker();
