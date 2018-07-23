import * as React from 'react';
// import axios from 'axios';

import SearchBar from './searchbar';
import Logo from './logo';
import * as constants from '../../constants';

import './styles.css';

interface State {
	query: string;
	category: string;
}

interface Header {
	baseUrl: string;
}

class Header extends React.Component<any, any> {
	state: State = { query: '', category: '' };
	constructor(props: any) {
		super(props);

		this.baseUrl = `${constants.BACKEND_API_URL}/search`;
	}

	updateState = (event: React.FormEvent<HTMLInputElement>): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
		console.log(this.state);
	};

	public handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const { query, category } = this.state;

		try {
			console.log('Query: ', query);
			console.log('Category: ', category);
			console.log('Url: ', `${this.baseUrl}?q=${query}&c=${category}`);
			// await axios.get(`${this.baseUrl}?q=${query}&c=${category}`);

			return;
		} catch (error) {
			console.log(error);

			return;
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
							<li>
								<a className="btn btn-link" href="/login">
									Login
								</a>
							</li>
							<li>
								<a className="btn btn-link" href="/register">
									Register
								</a>
							</li>
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

export { Header };
