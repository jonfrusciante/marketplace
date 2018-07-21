import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, Login, Register } from './containers';
import './App.css';

class App extends React.Component<any, any> {
	public render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
				</Switch>
			</BrowserRouter>
		);
	}
}
export default App;
