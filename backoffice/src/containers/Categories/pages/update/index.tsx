import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from '../../components/Form';
import Loading from '../../../../components/loading';
import * as CategoryActions from '../../../../actions/Category';

const validate = Yup.object().shape({
	name: Yup.string()
		.required('Category name is required')
		.trim(),
});

class U extends React.PureComponent<any, any> {
	public loadingTimeout: any;

	state = { name: '', parentId: '', categories: [], loading: true };

	async componentDidMount() {
		const { payload: categories } = await this.props.getCategories();
		const { payload: category } = await this.props.getCategory(
			this.props.match.params.id
		);
		const { name, parentId } = category;

		this.setState({ name, parentId, categories });
		this.loadingTimeout = window.setTimeout(() => {
			this.setState({ loading: false });
		}, Number(process.env.REACT_APP_LOADING_SPINNER_TIMEOUT));
		document.title = `Update Category - ${name}`;
	}

	componentWillUnmount() {
		clearTimeout(this.loadingTimeout);
	}

	handleSubmit = async (values: any): Promise<void> => {
		const { id } = this.props.match.params;
		this.props.updateCategory(values, id, () => {
			this.props.history.push('/categories');
		});
	};

	renderForm = ({
		values,
		handleChange,
		errors,
		touched,
		handleBlur,
		isValid,
		isSubmitting,
		handleSubmit,
	}: any) => (
		<Form
			onChange={handleChange}
			errors={errors}
			values={values}
			touched={touched}
			onBlur={handleBlur}
			loading={isSubmitting}
			isValid={isValid}
			onSubmit={handleSubmit}
			categories={this.state.categories}
		/>
	);

	render() {
		const { name, parentId, loading } = this.state;
		if (loading) {
			return <Loading />;
		}
		return (
			<Formik
				initialValues={{ name, parentId }}
				onSubmit={this.handleSubmit}
				render={this.renderForm}
				validationSchema={validate}
			/>
		);
	}
}

const mapStateToProps = (state: any): any => state;

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ ...CategoryActions }, dispatch);

const Update = connect(
	mapStateToProps,
	mapDispatchToProps
)(U);

export { Update };