import * as React from 'react';

export default class SearchBar extends React.PureComponent<any, any> {
	render() {
		return (
			<div className="input-group hidden-xs-down wd-170 transition">
				<input
					id="searchbox"
					type="text"
					className="form-control"
					placeholder="Search"
				/>
				<span className="input-group-btn">
					<button className="btn btn-secondary" type="button">
						<i className="fa fa-search" />
					</button>
				</span>
			</div>
		);
	}
}