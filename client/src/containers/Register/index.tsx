import axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';

import MainLayout from '../../components/layouts/MainLayout';
import * as constants from '../../constants';

interface Register {
	baseUrl: string;
}

interface State {
	first_name: string;
	last_name: string;
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	error?: string;
}

class Register extends React.Component<any, any> {
	public state: State = {
		first_name: '',
		last_name: '',
		username: '',
		email: '',
		password: '',
		passwordConfirm: '',
		error: '',
	};

	constructor(props: any) {
		super(props);

		this.baseUrl = constants.BACKEND_API_URL;
	}

	public onSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		try {
			const {
				first_name,
				last_name,
				username,
				email,
				password,
				passwordConfirm,
			} = this.state;
			const url = `${this.baseUrl}/register`;
			if (passwordConfirm !== password) {
				this.setState({ error: 'Password Confirmation must match' });

				return;
			}

			await axios.post(url, {
				first_name,
				last_name,
				username,
				email,
				password,
			});
			this.setState({
				first_name: '',
				last_name: '',
				username: '',
				email: '',
				password: '',
				passwordConfirm: '',
				error: '',
			});
		} catch ({ message }) {
			this.setState({ error: message });
		}
	};

	public updateState = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	public render() {
		return (
			<MainLayout>
				<div className="App">
					<section className="h-100">
						<div className="container h-100">
							<div className="row justify-content-md-center h-100">
								<div className="card-wrapper">
									<div className="brand">
										{/* <img src="img/logo.jpg"> */}
									</div>
									<Link to="/">Home</Link>
									<div className="card fat">
										<div className="card-body">
											<h4 className="card-title">
												Register
											</h4>
											<form
												onSubmit={this.onSubmit}
												encType="multipart/form-data">
												<div className="form-group">
													<label htmlFor="last_name">
														First Name
													</label>
													<input
														id="first_name"
														type="first_name"
														className="form-control"
														name={'first_name'}
														required={true}
														minLength={3}
														maxLength={255}
														autoFocus={true}
														autoComplete={'off'}
														value={
															this.state
																.first_name
														}
														onChange={
															this.updateState
														}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="last_name">
														Last Name
													</label>
													<input
														id="last_name"
														type="last_name"
														className="form-control"
														name={'last_name'}
														required={true}
														minLength={3}
														maxLength={255}
														autoComplete={'off'}
														value={
															this.state.last_name
														}
														onChange={
															this.updateState
														}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="username">
														Username
													</label>
													<input
														id="username"
														type="username"
														className="form-control"
														name={'username'}
														required={true}
														minLength={3}
														maxLength={255}
														autoComplete={'off'}
														value={
															this.state.username
														}
														onChange={
															this.updateState
														}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="email">
														E-Mail Address
													</label>
													<input
														id="email"
														type="email"
														className="form-control"
														name={'email'}
														required={true}
														minLength={3}
														maxLength={255}
														autoComplete={'off'}
														value={this.state.email}
														onChange={
															this.updateState
														}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="password">
														Password
													</label>
													<input
														id="password"
														type="password"
														className="form-control"
														name={'password'}
														required={true}
														minLength={6}
														maxLength={255}
														value={
															this.state.password
														}
														onChange={
															this.updateState
														}
													/>
												</div>

												<div className="form-group">
													<label htmlFor="passwordConfirm">
														Confirm Password
													</label>
													<input
														id="passwordConfirm"
														type="password"
														className="form-control"
														name={'passwordConfirm'}
														required={true}
														minLength={6}
														maxLength={255}
														value={
															this.state
																.passwordConfirm
														}
														onChange={
															this.updateState
														}
													/>
												</div>

												<div className="form-group no-margin">
													<button
														type="submit"
														className="btn btn-primary btn-block">
														Register
													</button>
												</div>
												{this.state.error !== '' && (
													<div className="mt-2">
														<p className="text-danger text-center">
															{this.state.error}
														</p>
													</div>
												)}
												<div className="margin-top20 text-center">
													Already have an account?{' '}
													<Link to="/login">
														Login
													</Link>
												</div>
											</form>
										</div>
									</div>
									<div className="footer">
										Copyright &copy; 2017 &mdash; Your
										Company
									</div>
								</div>
							</div>
						</div>
					</section>
				</div>
			</MainLayout>
		);
	}
}

export { Register };
