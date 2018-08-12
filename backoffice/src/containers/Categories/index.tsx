import * as React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import MainLayout from '../../components/layouts/MainLayout';
import AuthenticatedCheck from '../../hoc/AuthenticatedCheck';
import { Index, Create, Update, View } from './pages';

import './style/index.css';

class C extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const { match, location } = this.props;
		const links = location.pathname
			.split('/')
			.filter((v: string) => v !== '');
		const length = links.length - 1;
		return (
			<MainLayout>
				<div className="br-pageheader">
					<nav className="breadcrumb pd-0 mg-0 tx-12">
						{links.map((link: string, index: number) => {
							const active = index === length ? 'active' : '';
							const linkText = link.replace(/^\w/, u =>
								u.toUpperCase()
							);
							return (
								<span
									className={`breadcrumb-item ${active}`}
									key={index}>
									{index === 0 ? (
										<Link to={`/${link}`}>{linkText}</Link>
									) : (
										<span>{linkText}</span>
									)}
								</span>
							);
						})}
					</nav>
				</div>
				<div className="br-pagetitle">
					<i className="icon ion-ios-cart-outline tx-24" />
					<div>
						<h4>Categories</h4>
					</div>
				</div>

				<div className="br-pagebody">
					<Switch>
						<Route
							exact={true}
							path={`${match.path}`}
							component={Index}
						/>
						<Route
							path={`${match.path}/create`}
							component={Create}
						/>
						<Route
							path={`${match.path}/update/:id`}
							component={Update}
						/>
						<Route
							path={`${match.path}/view/:id`}
							component={View}
						/>
					</Switch>
				</div>
			</MainLayout>
		);
	}
}

const Categories = AuthenticatedCheck(C, true);

export { Categories };