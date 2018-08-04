import * as React from 'react';
import { Link } from 'react-router-dom';

import '../../style/index.css';

class Index extends React.PureComponent<any, any> {
	render() {
		return (
			<React.Fragment>
				<h3>Hello Products</h3>
				<Link to="/products/create" className="btn btn-link">
					Create
				</Link>
				<Link to="/products/view/20" className="btn btn-link">
					View
				</Link>
				<Link to="/products/update/20" className="btn btn-link">
					Update
				</Link>
			</React.Fragment>
		);
	}
}

export { Index };
