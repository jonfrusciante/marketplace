import * as React from 'react';
import { Carousel } from '../../../components/common';

class View extends React.PureComponent<any, any> {
	render() {
		return (
			<React.Fragment>
				<Carousel data={this.props.data} />
			</React.Fragment>
		);
	}
}

export { View };
