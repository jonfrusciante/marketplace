import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchBar from './searchbar';
import Logo from './logo';
import { userLogout } from '../../actions/User';
import './style/index.css';

interface State {
	query: string;
	category: string;
}

interface H {
	baseUrl: string;
}

class H extends React.Component<any, any> {
	state: State = { query: '', category: '' };
	constructor(props: any) {
		super(props);

		this.baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/search`;
	}

	updateState = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		const { query, category } = this.state;

		console.log('Query: ', query);
		console.log('Category: ', category);
		console.log('Url: ', `${this.baseUrl}?q=${query}&c=${category}`);
	};

	handleLogout = () => {
		this.props.userLogout(() => {
			window.location.replace('/');
		});
	};

	renderLinks = () => {
		const { user } = this.props;
		if (!user.token) {
			return (
				<React.Fragment>
					<li>
						<Link className="btn btn-link" to="/login">
							Login
						</Link>
					</li>
					<li>
						<Link className="btn btn-link" to="/register">
							Register
						</Link>
					</li>
				</React.Fragment>
			);
		} else {
			return (
				<li>
					<button
						className="btn btn-link"
						onClick={this.handleLogout}>
						Logout
					</button>
				</li>
			);
		}
	};

	render() {
		return (
			<div className="row">
				<div className="header">
					<div className="left">
						<Logo />
					</div>
					<div className="center">
						<SearchBar
							onChange={this.updateState}
							onSubmit={this.handleSubmit}
						/>
					</div>
					<div className="right">
						<ul>
							<li>
								<a className="btn btn-link" href="/">
									Orders
								</a>
							</li>
							{this.renderLinks()}
							<li>
								<a className="btn btn-link" href="#">
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

const Header = connect(
	null,
	{ userLogout }
)(H);

export { Header };
