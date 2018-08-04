import * as React from 'react';

import Logo from '../../../common/Logo';
import NavItems from './NavItems';

export default class Sidebar extends React.PureComponent<any, any> {
	render() {
		return (
			<React.Fragment>
				<div className="br-logo">
					<a href="/">
						<Logo />
					</a>
				</div>
				<div className="br-sideleft overflow-y-auto">
					<label className="sidebar-label pd-x-10 mg-t-20 op-3">
						Navigation
					</label>
					<NavItems />
					<br />
				</div>
			</React.Fragment>
		);
	}
}