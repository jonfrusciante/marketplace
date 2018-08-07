import * as React from 'react';
import { Link } from 'react-router-dom';

import '../../style/index.css';

class Index extends React.PureComponent<any, any> {
	render() {
		return (
			<React.Fragment>
				<h3>Hello Categories</h3>
				<Link to="/categories/create" className="btn btn-link">
					Create
				</Link>
				<Link to="/categories/view/20" className="btn btn-link">
					View
				</Link>
				<Link to="/categories/update/20" className="btn btn-link">
					Update
				</Link>
			</React.Fragment>
		);
	}
}

export { Index };
