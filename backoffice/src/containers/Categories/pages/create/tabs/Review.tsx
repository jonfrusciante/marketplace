import * as React from 'react';

export default class Review extends React.PureComponent<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { values } = this.props;
		return (
			<React.Fragment>
				<p>{values.category}</p>
				<p>{values.subCategory}</p>
			</React.Fragment>
		);
	}
}
