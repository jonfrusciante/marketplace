import * as React from 'react';

import './styles.css';

// interface LogoProps {}

export default class Logo extends React.Component<{}, {}> {
	render() {
		return (
			<React.Fragment>
				<a href="/">
					<img
						src="/img/amazon.png"
						alt="amazon"
						className="img-fluid"
					/>
				</a>
			</React.Fragment>
		);
	}
}
