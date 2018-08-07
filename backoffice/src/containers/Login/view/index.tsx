import * as React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

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
			values: { email, password },
			user,
		} = this.props;
		return (
			<div className="d-flex align-items-center justify-content-center bg-br-primary ht-100v">
				<div className="login-wrapper wd-300 wd-xs-350 pd-25 pd-xs-40 bg-white rounded shadow-base">
					<div className="signin-logo tx-center tx-28 tx-bold tx-inverse mg-b-60">
						<span>(bamazon)</span>
					</div>
					<FormGroup
						label="Email"
						labelFor="email"
						helperText={
							touched.email && errors.email
								? errors.email
								: undefined
						}
						intent={
							touched.email && errors.email ? 'danger' : undefined
						}>
						<InputGroup
							id="email"
							placeholder="Enter your email"
							name="email"
							required={true}
							autoFocus={true}
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
				</div>
			</div>
		);
	}
}

export { View };
