import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MainLayout from '../../components/layouts/MainLayout';
import * as RegisterActions from '../../actions/User/Register';
import { View } from './view';
import AuthenticatedCheck from '../../hoc/AuthenticatedCheck';

// interface Register {}

interface State {
	readonly name: string;
	readonly email: string;
	readonly confirmPassword: string;
	readonly password: string;
	readonly _csrf: string;
	readonly error?: string;
	readonly disabled: boolean;
}

class Container extends React.Component<any, any> {
	public state: State = {
		name: '',
		email: '',
		confirmPassword: '',
		password: '',
		_csrf: '',
		error: '',
		disabled: false,
	};

	constructor(props: any) {
		super(props);
	}

	updateState = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { name, email, confirmPassword, password } = this.state;

		if (password !== confirmPassword) {
			this.setState({ error: 'Passwords must match.' });

			return;
		}

		this.setState({ disabled: true });
		this.props.userRegister({ name, email, password }, () => {
			this.props.history.push('/');
		});
	};

	render() {
		return (
			<MainLayout>
				<View
					onChange={this.updateState}
					onSubmit={this.handleSubmit}
					errors={this.state.error}
					disabled={this.state.disabled}
				/>
			</MainLayout>
		);
	}
}

const mapStateToProps = (user: any): any => {
	return { user };
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			...RegisterActions,
		},
		dispatch
	);
};

const Register = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthenticatedCheck(Container, false));

export { Register };
