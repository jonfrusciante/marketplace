import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, Login, Products, NotFound } from './containers';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.css';

class App extends React.Component<any, any> {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/products" component={Products} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
