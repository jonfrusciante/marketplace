import * as React from 'react';

import './styles.css';

// interface SearchBarProps {}

export default class SearchBar extends React.Component<{}, {}> {
	render() {
		return (
			<div id="main-search-form">
				<form>
					<select name="c" id="c" className="form-control">
						<option value="1">All Departments</option>
						<option value="2">Electronics</option>
						<option value="3">Home Improvements</option>
						<option value="4">Pets</option>
					</select>
					<input
						type="text"
						name="q"
						id="q"
						className="form-control"
						autoComplete="off"
						placeholder="Search for anything"
					/>
					<button type="submit" className="btn btn-link">
						<i className="fa fa-search" />
					</button>
				</form>
			</div>
		);
	}
}
