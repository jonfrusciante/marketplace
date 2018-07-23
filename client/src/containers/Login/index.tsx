import axios from 'axios';
import * as React from 'react';

import MainLayout from '../../components/layouts/MainLayout';
import * as constants from '../../constants';
import { View } from './view';

interface Login {
	baseUrl: string;
}

interface State {
	email: string;
	password: string;
	_csrf: string;
	error?: string;
	disabled: boolean;
}

class Login extends React.Component<any, any> {
	public state: State = {
		email: '',
		password: '',
		_csrf: '',
		error: '',
		disabled: false,
	};

	constructor(props: any) {
		super(props);

		this.baseUrl = `${constants.BACKEND_API_URL}/login`;
	}

	public updateState = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		this.setState({ disabled: true });
		const { email, password } = this.state;

		try {
			await axios({
				url: this.baseUrl,
				method: 'POST',
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					email,
					password,
				},
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

export { Login };
