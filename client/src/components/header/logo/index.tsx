import * as React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Logo extends React.Component<{}, {}> {
	render() {
		return (
			<React.Fragment>
				<Link to="/">
					<img
						src="/img/amazon-logo.png"
						alt="amazon"
						className="img-fluid"
					/>
				</Link>
			</React.Fragment>
		);
	}
}
