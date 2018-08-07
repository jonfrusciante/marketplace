import * as React from 'react';
import { Button } from '@blueprintjs/core';

import './styles.css';

export default (props: any) => (
	<div id="main-search-form">
		<form onSubmit={props.onSubmit}>
			<select
				name="category"
				id="category"
				className="form-control"
				onChange={props.onChange}>
				<option value="all">All Departments</option>
				<option value="electronics">Electronics</option>
				<option value="home-improvments">Home Improvements</option>
				<option value="pets">Pets</option>
			</select>
			<input
				type="text"
				name="query"
				id="query"
				className="form-control"
				autoComplete="off"
				placeholder="Search for anything..."
				onChange={props.onChange}
			/>
			<Button type="submit" className="btn btn-link">
				<i className="fa fa-search" />
			</Button>
		</form>
	</div>
);
