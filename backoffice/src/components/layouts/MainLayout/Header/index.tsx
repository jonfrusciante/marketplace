import * as React from 'react';

import SearchBar from '../SearchBar';
import Profile from '../Profile';
import Messages from '../Messages';
import Notifications from '../Notifications';

export default class Header extends React.PureComponent<any, any> {
	render() {
		const user = { ...this.props.user };
		return (
			<div className="br-header">
				<div className="br-header-left">
					<div className="navicon-left hidden-md-down">
						<a id="btnLeftMenu" href="#">
							<i className="icon ion-navicon-round" />
						</a>
					</div>
					<div className="navicon-left hidden-lg-up">
						<a id="btnLeftMenuMobile" href="#">
							<i className="icon ion-navicon-round" />
						</a>
					</div>
					<SearchBar />
				</div>
				<div className="br-header-right">
					<nav className="nav">
						<Messages />
						<Notifications />
						<Profile user={user} />
					</nav>
					{/*<div className="navicon-right">
						<a id="btnRightMenu" href="#" className="pos-relative">
							<i className="icon ion-ios-chatboxes-outline" />
							<span className="square-8 bg-danger pos-absolute t-10 r--5 rounded-circle" />
						</a>
					</div>*/}
				</div>
			</div>
		);
	}
}
