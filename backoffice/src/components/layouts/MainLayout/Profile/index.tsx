import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userLogout } from '../../../../actions/User';

class P extends React.PureComponent<any, any> {
	handleLogout = () => {
		this.props.userLogout(() => {
			window.location.replace('/login');
		});
	};

	render() {
		const { name, email } = this.props.user;
		return (
			<div className="dropdown">
				<Link
					to="#"
					className="nav-link nav-link-profile"
					data-toggle="dropdown">
					<span className="logged-name hidden-md-down">{name}</span>
					<img
						src="http://via.placeholder.com/500x500"
						className="wd-32 rounded-circle"
						alt=""
					/>
					<span className="square-10 bg-success" />
				</Link>
				<div className="dropdown-menu dropdown-menu-header wd-250">
					<div className="tx-center">
						<Link to="/users/profile">
							<img
								src="http://via.placeholder.com/500x500"
								className="wd-80 rounded-circle"
								alt=""
							/>
						</Link>
						<h6 className="logged-fullname">{name}</h6>
						<p>{email}</p>
					</div>
					<hr />
					<ul className="list-unstyled user-profile-nav">
						<li>
							<Link to="/users/profile">
								<i className="icon ion-ios-person" /> Edit
								Profile
							</Link>
						</li>
						<li>
							<Link to="users/settings">
								<i className="icon ion-ios-gear" /> Settings
							</Link>
						</li>
						<li>
							<a onClick={this.handleLogout}>
								<i className="icon ion-power" /> Sign Out
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

const Profile = connect(
	null,
	{ userLogout }
)(P);

export default Profile;
