import * as React from 'react';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

class View extends React.PureComponent<any, any> {
	render() {
		const { onSubmit, onChange, disabled, errors } = this.props;
		return (
			<div className="d-flex align-items-center justify-content-center bg-br-primary ht-100v">
				<div className="login-wrapper wd-300 wd-xs-350 pd-25 pd-xs-40 bg-white rounded shadow-base">
					<div className="signin-logo tx-center tx-28 tx-bold tx-inverse mg-b-60">
						<span>(bamazon)</span>
					</div>
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
								loading={disabled}
							/>
						</FormGroup>
					</form>
					{errors && (
						<div className="mt-2">
							<p className="text-danger text-center">{errors}</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export { View };