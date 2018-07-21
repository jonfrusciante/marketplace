// import axios from 'axios';
import * as React from 'react';
// import { Link } from 'react-router-dom';

import MainLayout from '../../components/layouts/MainLayout';
import * as constants from '../../constants';
import { View } from './login.view';

interface Login {
	baseUrl: string;
}

interface State {
	email: string;
	password: string;
	_csrf: string;
	error?: string;
}

class Login extends React.Component<{}, {}> {
	public state: State = { email: '', password: '', _csrf: '', error: '' };

	constructor(props: any) {
		super(props);

		this.baseUrl = constants.BACKEND_API_URL;
	}

	public render() {
		return (
			<MainLayout>
				<View baseUrl={this.baseUrl} />
			</MainLayout>
		);
	}
}

export { Login };
