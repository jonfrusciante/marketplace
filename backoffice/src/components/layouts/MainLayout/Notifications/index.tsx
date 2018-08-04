import * as React from 'react';

export default class Notifications extends React.PureComponent<any, any> {
	render() {
		return (
			<div className="dropdown">
				<a
					href="#"
					className="nav-link pd-x-7 pos-relative"
					data-toggle="dropdown">
					<i className="icon ion-ios-bell-outline tx-24" />
					<span className="square-8 bg-danger pos-absolute t-15 r-5 rounded-circle" />
				</a>
				<div className="dropdown-menu dropdown-menu-header">
					<div className="dropdown-menu-label">
						<label>Notifications</label>
						<a href="#">Mark All as Read</a>
					</div>
					<div className="media-list">
						<a href="#" className="media-list-link read">
							<div className="media">
								<img
									src="http://via.placeholder.com/280x280"
									alt=""
								/>
								<div className="media-body">
									<p className="noti-text">
										<strong>Suzzeth Bungaos</strong> tagged
										you and 18 others in a post.
									</p>
									<span>October 03, 2017 8:45am</span>
								</div>
							</div>
						</a>
						<a href="#" className="media-list-link read">
							<div className="media">
								<img
									src="http://via.placeholder.com/280x280"
									alt=""
								/>
								<div className="media-body">
									<p className="noti-text">
										<strong>Mellisa Brown</strong>{' '}
										appreciated your work
										<strong>The Social Network</strong>
									</p>
									<span>October 02, 2017 12:44am</span>
								</div>
							</div>
						</a>
						<a href="#" className="media-list-link read">
							<div className="media">
								<img
									src="http://via.placeholder.com/280x280"
									alt=""
								/>
								<div className="media-body">
									<p className="noti-text">
										20+ new items added are for sale in your
										<strong>Sale Group</strong>
									</p>
									<span>October 01, 2017 10:20pm</span>
								</div>
							</div>
						</a>
						<a href="#" className="media-list-link read">
							<div className="media">
								<img
									src="http://via.placeholder.com/280x280"
									alt=""
								/>
								<div className="media-body">
									<p className="noti-text">
										<strong>Julius Erving</strong> wants to
										connect with you on your conversation
										with
										<strong>Ronnie Mara</strong>
									</p>
									<span>October 01, 2017 6:08pm</span>
								</div>
							</div>
						</a>
						<div className="dropdown-footer">
							<a href="#">
								<i className="fa fa-angle-down" /> Show All
								Notifications
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}