import * as React from 'react';
import { Carousel } from '../../../components/common';
import { ProductCard } from '../../../components/product';

class View extends React.PureComponent<any, any> {
	render() {
		return (
			<React.Fragment>
				<Carousel data={this.props.data} />
				<ProductCard />
			</React.Fragment>
		);
	}
}

export { View };
