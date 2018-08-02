import * as React from 'react';

import { Carousel } from '../../../components/common';
import { ProductCardList } from '../../../components/product';

import '../style/index.css';

class View extends React.PureComponent<any, any> {
	renderWelcomeMessage() {
		const { user } = this.props;
		if (user && user.token) {
			return (
				<div className="welcome-message">Welcome back {user.name}</div>
			);
		}

		return;
	}

	render() {
		console.log('Home Props: ', this.props);
		return (
			<React.Fragment>
				{this.renderWelcomeMessage()}
				<Carousel data={this.props.sliderImages} />
				<hr />
				<div className="container">
					<div className="row">
						<ProductCardList data={this.props.products} />
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export { View };
