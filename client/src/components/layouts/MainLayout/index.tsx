import * as React from 'react';

import { Header } from '../../header';
import PassUserProps from '../../../hoc/PassUserProps';

import './style/index.css';

class MainLayout extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { user, children } = this.props;
		const userInfo = { ...user };
		const childrenWithProps = React.Children.map(children, (child: any) =>
			React.cloneElement(child, { ...this.props })
		);
		const displayDivider = !user.token ? 'divider' : '';
		return (
			<React.Fragment>
				<div className="container-fluid shadow">
					<Header user={userInfo} />
				</div>
				<div className={displayDivider} />
				<div className="App">
					<section className="h-100">
						<div className="container-fluid h-100">
							<div className="row justify-content-md-center h-100 flex-column">
								{childrenWithProps}
							</div>
						</div>
					</section>
				</div>
				<div className="divider mt-5" />
				<div className="container-fluid">
					<section className="h-100">
						<div className="container-fluid h-100">
							<div className="row justify-content-md-center h-100">
								<div className="footer">
									<p className="small">
										Copyright &copy;{' '}
										{new Date().getFullYear()} &mdash;
										Bamazon
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</React.Fragment>
		);
	}
}

export default PassUserProps(MainLayout);
