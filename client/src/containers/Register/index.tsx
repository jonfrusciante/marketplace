import axios from 'axios';
import * as React from 'react';

import MainLayout from '../../components/layouts/MainLayout';
import * as constants from '../../constants';
import { View } from './view';

interface Register {
	baseUrl: string;
}

interface State {
	name: string;
	email: string;
	confirmPassword: string;
	password: string;
	_csrf: string;
	error?: string;
	disabled: boolean;
}

class Register extends React.Component<any, any> {
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

		this.baseUrl = `${constants.BACKEND_API_URL}/register`;
	}

	public updateState = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const { name, email, confirmPassword, password } = this.state;

		if (password !== confirmPassword) {
			this.setState({ error: 'Passwords must match.' });

			return;
		}

		this.setState({ disabled: true });

		try {
			await axios({
				url: this.baseUrl,
				method: 'POST',
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					name,
					email,
					password,
				},
			});

			this.setState({
				name: '',
				email: '',
				password: '',
				confirmPassword: '',
				error: '',
			});

			window.location.replace('/');

			return;
		} catch (error) {
			console.log(error);
			this.setState({ disabled: false, error: error.message });

			return;
		}
	};

	public render() {
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

export { Register };
