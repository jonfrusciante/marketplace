import * as React from 'react';

import Sidebar from './Sidebar';
import Header from './Header';

import PassUserProps from '../../../hoc/PassUserProps';

import './style/index.css';

class MainLayout extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		// const { children } = this.props;
		// const childrenWithProps = React.Children.map(children, (child: any) =>
		// 	React.cloneElement(child, { ...this.props })
		// );

		return (
			<React.Fragment>
				<Header user={this.props.user} />
				<Sidebar />
				<div className="br-mainpanel">{this.props.children}</div>
			</React.Fragment>
		);
	}
}

export default PassUserProps(MainLayout);
