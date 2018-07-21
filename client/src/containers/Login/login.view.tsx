import * as React from 'react';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

interface State {
	email: string;
	password: string;
	error?: string;
}

class V extends React.PureComponent<any, any> {
	public state: State = { email: '', password: '', error: '' };
	private url = `${this.props.baseUrl}/login`;

	public updateState = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		this.props.form.validateFields(async (error: any, values: State) => {
			if (!error) {
				console.log('Received values of form: ', values);
				const { email, password } = this.state;
				try {
					await axios.post(this.url, {
						email,
						password,
					});

					this.setState({ email: '', password: '' });

					return;
				} catch (error) {
					console.log(error);

					return;
				}
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<form onSubmit={this.handleSubmit} className="login-form">
				<div>
					<FormItem>
						{getFieldDecorator('email', {
							rules: [
								{
									required: true,
									message: 'Please input your email!',
								},
							],
						})(
							<Input
								name="email"
								type="email"
								prefix={
									<Icon
										type="user"
										style={{ color: 'rgba(0,0,0,.25)' }}
									/>
								}
								placeholder="Email"
								onChange={this.updateState}
							/>
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: 'Please input your password!',
								},
							],
						})(
							<Input
								name="password"
								type="password"
								prefix={
									<Icon
										type="user"
										style={{ color: 'rgba(0,0,0,.25)' }}
									/>
								}
								placeholder="Password"
								onChange={this.updateState}
							/>
						)}
					</FormItem>
					<FormItem>
						<Checkbox>Remember me</Checkbox>
						<a className="login-form-forgot" href="">
							Forgot password
						</a>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button">
							Log in
						</Button>
						Or <a href="">register now!</a>
					</FormItem>
				</div>
			</form>
		);
	}
}

export const View = Form.create()(V);
