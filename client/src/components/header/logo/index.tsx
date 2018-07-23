import * as React from 'react';

import './styles.css';

export default class Logo extends React.Component<{}, {}> {
	render() {
		return (
			<React.Fragment>
				<a href="/">
					<img
						src="/img/amazon.png"
						alt="amazon"
						className="img-fluid"
						height={40}
					/>
				</a>
			</React.Fragment>
		);
	}
}
