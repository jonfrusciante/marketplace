import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Loading from '../../../../components/loading';
import * as CategoryActions from '../../../../actions/Category';

const createButton = () => (
	<Link to="/categories/create" className="bp3-button bp3-intent-primary">
		Create
	</Link>
);

class I extends React.PureComponent<any, any> {
	public loadingTimeout: any;

	state = { categories: [], loading: true };

	fetchCategories = async () => {
		const { payload: categories } = await this.props.getCategories();
		this.setState({ categories });
	}

	deleteCategory = async (id: string) => {
		this.setState({ loading: true });

		await this.props.deleteCategory(id);
		this.fetchCategories();

		this.loadingTimeout = window.setTimeout(() => {
			this.setState({ loading: false });
		}, Number(process.env.REACT_APP_LOADING_SPINNER_TIMEOUT));
	}

	componentDidMount() {
		this.fetchCategories();

		this.loadingTimeout = window.setTimeout(() => {
			this.setState({ loading: false });
		}, Number(process.env.REACT_APP_LOADING_SPINNER_TIMEOUT));
		document.title = 'Categories';
	}

	componentWillUnmount() {
		clearTimeout(this.loadingTimeout);
	}

	actionButtons = (_: any, row: any) => (
		<React.Fragment>
			<Link
				to={`/categories/update/${row.id}`}
				className="ml-3 bp3-button bp3-intent-primary">
				<i className="icon ion-ios-compose-outline tx-18" />
			</Link>
			<button
				// tslint:disable-next-line jsx-no-lambda
				onClick={() => this.deleteCategory(row.id)}
				className="ml-3 bp3-button bp3-intent-danger">
				<i className="icon ion-ios-trash-outline tx-18" />
			</button>
		</React.Fragment>
	);

	render() {
		const { categories, loading } = this.state;
		const options = {
			btnGroup: createButton,
		};
		if (loading) {
			return (
				<Loading />
			);
		}
		return (
			<React.Fragment>
				<div className="divider" />
				<BootstrapTable
					data={categories}
					options={options}
					striped={true}
					hover={true}
					pagination={true}
					exportCSV={true}
					version="4">
					<TableHeaderColumn
						isKey={true}
						width={'32%'}
						dataField="name"
						dataSort={true}>
						Name
					</TableHeaderColumn>
					<TableHeaderColumn
						width={'32%'}
						dataField="slug"
						dataSort={true}>
						Slug
					</TableHeaderColumn>
					<TableHeaderColumn
						width={'32%'}
						dataField="parentCategory"
						dataSort={true}>
						Parent Category
					</TableHeaderColumn>
					<TableHeaderColumn
						width={'7.5%'}
						dataField="Actions"
						dataFormat={this.actionButtons}>
						Actions
					</TableHeaderColumn>
				</BootstrapTable>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any): any => state;

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ ...CategoryActions }, dispatch);

const Index = connect(
	mapStateToProps,
	mapDispatchToProps
)(I);

export { Index };