import * as React from 'react';

interface State {
	hasError: boolean;
	info: string;
	error: string;
}

class ErrorBoundary extends React.Component<any, State> {
	state = {
		hasError: false,
		info: '',
		error: '',
	};

	constructor(props: any) {
		super(props);
	}

	componentDidCatch(error: any, info: any) {
		this.setState({ hasError: true, info, error });
		console.log(`Error: ${error}`);
		console.log(`ErrorInfo: ${JSON.stringify(info)}`);
	}

	render() {
		return this.state.hasError ? (
			<p>Something bad happened. :( </p>
		) : (
			this.props.children
		);
	}
}

export default ErrorBoundary;
