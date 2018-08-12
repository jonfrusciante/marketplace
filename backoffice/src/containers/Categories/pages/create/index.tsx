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

class C extends React.PureComponent<any, any> {
	public loadingTimeout: any;

	state = {
		name: '',
		parentId: '',
		categories: [],
		loading: true
	};

	handleSubmit = async (values: any): Promise<void> => {
		this.props.createCategory(values, () => {
			this.props.history.push('/categories');
		});
	};

	async componentDidMount() {
		const { payload: categories } = await this.props.getCategories();
		this.setState({ categories });
		document.title = 'Categories';

		this.loadingTimeout = window.setTimeout(() => {
			this.setState({ loading: false });
		}, Number(process.env.REACT_APP_LOADING_SPINNER_TIMEOUT));
	}

	componentWillUnmount() {
		clearTimeout(this.loadingTimeout);
	}

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
			return (
				<Loading />
			);
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

const Create = connect(
	mapStateToProps,
	mapDispatchToProps
)(C);

export { Create };
