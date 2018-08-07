import * as React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

class View extends React.PureComponent<any, any> {
	render() {
		const {
			onChange,
			disabled,
			errors,
			touched,
			isValid,
			loading,
			onBlur,
			onSubmit,
			values: { name, email, password, passwordConfirmation },
			user,
		} = this.props;
		return (
			<div className="card-wrapper">
				<div className="card fat">
					<div className="card-body">
						<h4 className="card-title">Create account</h4>
						<FormGroup
							label="Name"
							labelFor="name"
							helperText={
								touched.name && errors.name
									? errors.name
									: undefined
							}
							intent={
								touched.name && errors.name
									? 'danger'
									: undefined
							}>
							<InputGroup
								id="name"
								placeholder="Enter your name"
								name="name"
								required={true}
								autoFocus={true}
								type="name"
								minLength={3}
								maxLength={255}
								value={name}
								onBlur={onBlur}
								autoCapitalize="false"
								onChange={onChange}
								disabled={disabled}
								intent={
									touched.name && errors.name
										? 'danger'
										: undefined
								}
							/>
						</FormGroup>
						<FormGroup
							label="Email"
							labelFor="email"
							helperText={
								touched.email && errors.email
									? errors.email
									: undefined
							}
							intent={
								touched.email && errors.email
									? 'danger'
									: undefined
							}>
							<InputGroup
								id="email"
								placeholder="Enter your email"
								name="email"
								required={true}
								type="email"
								minLength={3}
								maxLength={255}
								value={email}
								onBlur={onBlur}
								autoCapitalize="false"
								onChange={onChange}
								disabled={disabled}
								intent={
									touched.email && errors.email
										? 'danger'
										: undefined
								}
							/>
						</FormGroup>
						<FormGroup
							label="Password"
							labelFor="password"
							helperText={
								touched.password && errors.password
									? errors.password
									: undefined
							}
							intent={
								touched.password && errors.password
									? 'danger'
									: undefined
							}>
							<InputGroup
								id="password"
								placeholder="Enter your password"
								name="password"
								required={true}
								type="password"
								minLength={6}
								maxLength={128}
								value={password}
								onBlur={onBlur}
								onChange={onChange}
								disabled={disabled}
								intent={
									touched.password && errors.password
										? 'danger'
										: undefined
								}
							/>
						</FormGroup>
						<FormGroup
							label="Password Confirmation"
							labelFor="passwordConfirmation"
							helperText={
								touched.passwordConfirmation &&
								errors.passwordConfirmation
									? errors.passwordConfirmation
									: undefined
							}
							intent={
								touched.passwordConfirmation &&
								errors.passwordConfirmation
									? 'danger'
									: undefined
							}>
							<InputGroup
								id="passwordConfirmation"
								placeholder="Confirm your password"
								name="passwordConfirmation"
								required={true}
								type="password"
								minLength={6}
								maxLength={128}
								value={passwordConfirmation}
								onBlur={onBlur}
								onChange={onChange}
								disabled={disabled}
								intent={
									touched.passwordConfirmation &&
									errors.passwordConfirmation
										? 'danger'
										: undefined
								}
							/>
						</FormGroup>
						<FormGroup>
							<Button
								intent="primary"
								type="submit"
								text="Login"
								fill={true}
								disabled={!isValid || loading}
								loading={loading}
								onClick={onSubmit}
							/>
						</FormGroup>
						{user &&
							user.message && (
								<div className="mt-2">
									<p className="text-danger text-center">
										{user.message}
									</p>
								</div>
							)}
						<div className="mt-3 mb-3">
							<p className="small">
								By creating an account, you agree to Amazon's
								Conditions of Use and Privacy Notice.
							</p>
						</div>
						<div className="divider divider-white" />
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
