import * as React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class View extends React.PureComponent<any, any> {
	render() {
		return (
			<div className="card-wrapper">
				<div className="card fat">
					<div className="card-body">
						<h4 className="card-title">Create account</h4>
						<form
							onSubmit={this.props.onSubmit}
							method="post"
							encType="multipart/form-data">
							<FormGroup label="Name" labelFor="name">
								<InputGroup
									id="name"
									name="name"
									required={true}
									type="text"
									onChange={this.props.onChange}
									disabled={this.props.disabled}
								/>
							</FormGroup>
							<FormGroup label="Email" labelFor="email">
								<InputGroup
									id="email"
									name="email"
									required={true}
									type="email"
									onChange={this.props.onChange}
									disabled={this.props.disabled}
								/>
							</FormGroup>
							<FormGroup
								label="Password"
								labelFor="password"
								helperText="Passwords must be atleast 6 characters long.">
								<InputGroup
									id="password"
									placeholder="At least 6 characters"
									name="password"
									required={true}
									type="password"
									minLength={6}
									maxLength={128}
									onChange={this.props.onChange}
									disabled={this.props.disabled}
								/>
							</FormGroup>
							<FormGroup
								label="Confirm Password"
								labelFor="confirmPassword">
								<InputGroup
									id="confirmPassword"
									name="confirmPassword"
									required={true}
									type="password"
									minLength={6}
									maxLength={128}
									onChange={this.props.onChange}
									disabled={this.props.disabled}
								/>
							</FormGroup>
							<FormGroup>
								<Button
									intent="primary"
									type="submit"
									text="Register"
									fill={true}
									disabled={this.props.disabled}
								/>
							</FormGroup>
						</form>
						{this.props.errors && (
							<div className="mt-2">
								<p className="text-danger text-center">
									{this.props.errors}
								</p>
							</div>
						)}
						<div className="mt-3 mb-3">
							<p className="small">
								By creating an account, you agree to Amazon's
								Conditions of Use and Privacy Notice.
							</p>
						</div>
						<div className="divider" />
						<div className="mt-3 text-center">
							Already have an account?{' '}
							<Link to="/login">Login</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export { View };
