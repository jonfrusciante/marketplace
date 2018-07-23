import * as React from 'react';

import './styles.css';

export default class SearchBar extends React.Component<any, any> {
	render() {
		return (
			<div id="main-search-form">
				<form onSubmit={this.props.onSubmit}>
					<select
						name="category"
						id="category"
						className="form-control"
						onChange={this.props.onChange}>
						<option value="all">All Departments</option>
						<option value="electronics">Electronics</option>
						<option value="home-improvments">
							Home Improvements
						</option>
						<option value="pets">Pets</option>
					</select>
					<input
						type="text"
						name="query"
						id="query"
						className="form-control"
						autoComplete="off"
						placeholder="Search for anything..."
						onChange={this.props.onChange}
					/>
					<button type="submit" className="btn btn-link">
						<i className="fa fa-search" />
					</button>
				</form>
			</div>
		);
	}
}
