import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as userAuthCheck from './actions/User/AuthCheck';
import { Home, Login, Products, Categories, NotFound } from './containers';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.css';

class App extends React.Component<any, any> {
	componentWillMount() {
		this.props.userAuthCheck(() => {
			window.location.replace('/login');
		});
	}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact={true} path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/products" component={Products} />
					<Route path="/categories" component={Categories} />
					<Route component={NotFound} />
				</Switch>
			</BrowserRouter>
		);
	}
}

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ ...userAuthCheck }, dispatch);

export default connect(
	null,
	mapDispatchToProps
)(App);
