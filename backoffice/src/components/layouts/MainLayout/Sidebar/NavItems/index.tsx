import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NavItems extends React.PureComponent<any, any> {
	render() {
		return (
			<ul className="br-sideleft-menu">
				<li className="br-menu-item">
					<Link to="/" className="br-menu-link">
						<i className="menu-item-icon icon ion-ios-home-outline tx-24" />
						<span className="menu-item-label">Dashboard</span>
					</Link>
				</li>
				<li className="br-menu-item">
					<Link to="/products" className="br-menu-link">
						<i className="menu-item-icon icon ion-ios-cart-outline tx-24" />
						<span className="menu-item-label">Products</span>
					</Link>
				</li>
				<li className="br-menu-item">
					<Link to="/orders" className="br-menu-link">
						<i className="menu-item-icon icon ion-ios-pricetags-outline tx-24" />
						<span className="menu-item-label">Orders</span>
					</Link>
				</li>
				<li className="br-menu-item">
					<Link to="/categories" className="br-menu-link">
						<i className="menu-item-icon icon ion-ios-filing-outline tx-24" />
						<span className="menu-item-label">Categories</span>
					</Link>
				</li>
				<li className="br-menu-item">
					<Link to="/users" className="br-menu-link with-sub">
						<i className="menu-item-icon icon ion-ios-photos-outline tx-20" />
						<span className="menu-item-label">Users</span>
					</Link>
					<ul className="br-menu-sub">
						<li className="sub-item">
							<Link to="/users/permissions" className="sub-link">
								Permissions
							</Link>
						</li>
						<li className="sub-item">
							<Link to="users/roles" className="sub-link">
								Roles
							</Link>
						</li>
					</ul>
				</li>
			</ul>
		);
	}
}
