import * as React from 'react';

export default class Messages extends React.PureComponent<any, any> {
	render() {
		return (
			<div className="dropdown">
				<a
					href="#"
					className="nav-link pd-x-7 pos-relative"
					data-toggle="dropdown">
					<i className="icon ion-ios-email-outline tx-24" />
					<span className="square-8 bg-danger pos-absolute t-15 r-0 rounded-circle" />
				</a>
				<div className="dropdown-menu dropdown-menu-header">
					<div className="dropdown-menu-label">
						<label>Messages</label>
						<a href="#">+ Add New Message</a>
					</div>
					<div className="media-list">
						<a href="#" className="media-list-link">
							<div className="media">
								<img
									src="http://via.placeholder.com/280x280"
									alt=""
								/>
								<div className="media-body">
									<div>
										<p>Donna Seay</p>
										<span>2 minutes ago</span>
									</div>
									<p>
										A wonderful serenity has taken
										possession of my entire soul, like these
										sweet mornings of spring.
									</p>
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
									<div>
										<p>Samantha Francis</p>
										<span>3 hours ago</span>
									</div>
									<p>
										My entire soul, like these sweet
										mornings of spring.
									</p>
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
									<div>
										<p>Robert Walker</p>
										<span>5 hours ago</span>
									</div>
									<p>
										I should be incapable of drawing a
										single stroke at the present moment...
									</p>
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
									<div>
										<p>Larry Smith</p>
										<span>Yesterday</span>
									</div>
									<p>
										When, while the lovely valley teems with
										vapour around me, and the meridian sun
										strikes...
									</p>
								</div>
							</div>
						</a>
						<div className="dropdown-footer">
							<a href="#">
								<i className="fa fa-angle-down" /> Show All
								Messages
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}