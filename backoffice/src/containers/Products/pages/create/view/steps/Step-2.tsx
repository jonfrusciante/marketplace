import * as React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';

interface State {
	name: string;
}

export default class Step2 extends React.PureComponent<any, any> {
	state: State = { name: '' };

	constructor(props: any) {
		super(props);
	}

	updateLocalState = (event: any): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	componentWillMount() {
		// this.props.updateFormState(this.state);
	}

	render() {
		const { disabled, errors } = this.props;
		return (
			<React.Fragment>
				<FormGroup
					label="Product Name"
					labelFor="name"
					helperText="This will be used to generate the product url slug">
					<InputGroup
						id="name"
						name="name"
						required={true}
						autoFocus={true}
						type="name"
						autoComplete="off"
						minLength={5}
						value={this.state.name}
						maxLength={255}
						onChange={this.updateLocalState}
						disabled={disabled}
					/>
				</FormGroup>
				{errors && (
					<div className="mt-2">
						<p className="text-danger text-center">{errors}</p>
					</div>
				)}
			</React.Fragment>
		);
	}
}
