import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { View } from './view';
import * as LoginActions from '../../actions/User/Login';
import AuthenticatedCheck from '../../hoc/AuthenticatedCheck';

// interface Container {}

interface State {
	readonly email: string;
	readonly password: string;
	readonly _csrf: string;
	readonly error?: string;
	readonly disabled: boolean;
}

class Container extends React.Component<any, any> {
	state: State = {
		email: '',
		password: '',
		_csrf: '',
		error: '',
		disabled: false,
	};

	constructor(props: any) {
		super(props);
	}

	updateState = (event: any): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	handleLogin = async (event: any) => {
		event.preventDefault();
		const { email, password } = this.state;
		this.setState({ disabled: true });
		this.props.userLogin({ email, password }, () => {
			this.props.history.push('/');
		});
	};

	render() {
		return (
			<View
				onChange={this.updateState}
				onSubmit={this.handleLogin}
				errors={this.state.error}
				disabled={this.state.disabled}
			/>
		);
	}
}

const mapStateToProps = (user: any): any => {
	return user;
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			...LoginActions,
		},
		dispatch
	);
};

const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthenticatedCheck(Container, false));

export { Login };