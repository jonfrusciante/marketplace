import * as React from 'react';

import Header from '../../header';

class MainLayout extends React.Component<any, any> {
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<Header />
				</div>
				<hr />
				<div className="container">{this.props.children}</div>
			</React.Fragment>
		);
	}
}

export default MainLayout;
