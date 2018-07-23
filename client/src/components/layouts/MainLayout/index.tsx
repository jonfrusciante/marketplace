import * as React from 'react';

import { Header } from '../../header';

class MainLayout extends React.Component<any, any> {
	render() {
		return (
			<React.Fragment>
				<div className="container-fluid shadow">
					<Header />
				</div>
				<div className="divider" />
				<div className="App">
					<section className="h-100">
						<div className="container-fluid h-100">
							<div className="row justify-content-md-center h-100">
								{this.props.children}
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
										Amazon
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

export default MainLayout;
