import * as React from 'react';
import { Link } from 'react-router-dom';

import MainLayout from '../../components/layouts/MainLayout';
import AuthenticatedCheck from '../../hoc/AuthenticatedCheck';

import { View } from './view';

class H extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		return (
			<MainLayout>
				<div className="br-pageheader">
					<nav className="breadcrumb pd-0 mg-0 tx-12">
						<span className="breadcrumb-item active">
							<Link to="/">Home</Link>
						</span>
					</nav>
				</div>
				<div className="br-pagetitle">
					<i className="icon icon ion-ios-book-outline" />
					<div>
						<h4>Home</h4>
					</div>
				</div>

				<div className="br-pagebody">
					<View />
				</div>
			</MainLayout>
		);
	}
}

const Home = AuthenticatedCheck(H, true);

export { Home };
