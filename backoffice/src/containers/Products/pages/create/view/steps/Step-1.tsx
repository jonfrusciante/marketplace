import * as React from 'react';
import { FormGroup, InputGroup } from '@blueprintjs/core';
// import { ItemRenderer, MultiSelect } from '@blueprintjs/select';

interface State {
	categories: string;
}

export default class Step1 extends React.PureComponent<any, any> {
	state: State = { categories: '' };

	constructor(props: any) {
		super(props);
	}

	updateLocalState = (event: any): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	render() {
		const { disabled, errors } = this.props;
		return (
			<React.Fragment>
				<FormGroup
					label="Categories"
					labelFor="categories"
					helperText="You can select up to 5 categories">
					<InputGroup
						id="categories"
						name="categories"
						required={true}
						autoFocus={true}
						type="categories"
						autoComplete="off"
						minLength={5}
						value={this.state.categories}
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
