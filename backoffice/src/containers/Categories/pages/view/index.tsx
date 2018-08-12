import * as React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CategoryActions from '../../../../actions/Category';
import { Category } from '../../types';

interface State {
	category: Category;
}

class V extends React.Component<any, any> {
	state: State = { category: {} as Category };

	async componentDidMount() {
		const { payload: category } = await this.props.getCategory(
			this.props.match.params.id
		);
		this.setState({ category });
		document.title = 'Category View';
	}

	render() {
		const { category } = this.state;
		return (
			<div>
				<h2>View a Category</h2>
				<table className="table table-hover table-bordered table-striped">
					<tbody>
						<tr>
							<th>#</th>
							<td>{category.id}</td>
						</tr>
						<tr>
							<th>Name</th>
							<td>{category.name}</td>
						</tr>
						<tr>
							<th>Slug</th>
							<td>{category.slug}</td>
						</tr>
						<tr>
							<th>Parent Category</th>
							<td>{category.parentCategory}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state: any): any => state;

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ ...CategoryActions }, dispatch);

const View = connect(
	mapStateToProps,
	mapDispatchToProps
)(V);

export { View };