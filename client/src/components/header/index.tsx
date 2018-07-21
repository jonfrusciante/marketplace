import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';

import SearchBar from './searchbar';
import Logo from './logo';

import './styles.css';
// interface HederProps {}

const menu = (
	<Menu>
		<Menu.Item>
			<a href="/">Orders</a>
		</Menu.Item>
		<Menu.Item>
			<a href="/login">Login</a>
		</Menu.Item>
		<Menu.Item>
			<a href="/register">Register</a>
		</Menu.Item>
	</Menu>
);

export default class Header extends React.Component<{}, {}> {
	render() {
		return (
			<div className="row">
				<div className="header">
					<div className="left">
						<Logo />
					</div>
					<div className="center">
						<SearchBar />
					</div>
					<div className="right">
						<ul>
							<li>
								<Dropdown overlay={menu}>
									<a className="ant-dropdown-link" href="#">
										Account <Icon type="down" />
									</a>
								</Dropdown>
							</li>
							<li>
								<a href="#" className="btn btn-link">
									Cart
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
