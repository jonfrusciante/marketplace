import * as React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class View extends React.PureComponent<any, any> {
	render() {
		const { onSubmit, onChange, disabled, errors } = this.props;
		return (
			<div className="card-wrapper">
				<div className="card fat">
					<div className="card-body">
						<h4 className="card-title">Sign in</h4>
						<form
							onSubmit={onSubmit}
							method="post"
							encType="multipart/form-data">
							<FormGroup label="Email" labelFor="email">
								<InputGroup
									id="email"
									placeholder="Enter your email"
									name="email"
									required={true}
									autoFocus={true}
									type="email"
									minLength={3}
									maxLength={255}
									onChange={onChange}
									disabled={disabled}
								/>
							</FormGroup>
							<FormGroup label="Password" labelFor="password">
								<InputGroup
									id="password"
									placeholder="Enter your password"
									name="password"
									required={true}
									type="password"
									minLength={6}
									maxLength={128}
									onChange={onChange}
									disabled={disabled}
								/>
							</FormGroup>
							<FormGroup>
								<Button
									intent="primary"
									type="submit"
									text="Login"
									fill={true}
									disabled={disabled}
								/>
							</FormGroup>
						</form>
						{errors && (
							<div className="mt-2">
								<p className="text-danger text-center">
									{errors}
								</p>
							</div>
						)}
						<div className="divider" />
						<div className="margin-top20 text-center">
							Don't have an account?{' '}
							<Link to="/register">Create One</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { View };
