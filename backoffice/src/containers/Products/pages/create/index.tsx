import * as React from 'react';

import View from './view';

interface State {
	name: string;
	categories: string[];
	error?: string;
	disabled: boolean;
}

class Create extends React.Component<any, any> {
	state: State = { name: '', categories: [], error: '', disabled: false };

	updateState = (event: any): void => {
		const { name, value }: any = event.currentTarget;
		console.log(`${name} : ${value}`);
		this.setState({ [name]: value });
	};

	handleSubmit = async (event: any) => {
		event.preventDefault();
		// const { name } = this.state;
		this.setState({ disabled: true });
		console.log(this.state);
		// this.props.productCreate({ name }, () => {
		// 	this.props.history.push('/');
		// });
	};

	render() {
		return (
			<div className="container">
				<View
					onSubmit={this.handleSubmit}
					errors={this.state.error}
					disabled={this.state.disabled}
					updateFormState={this.updateState}
				/>
			</div>
		);
	}
}

export { Create };
