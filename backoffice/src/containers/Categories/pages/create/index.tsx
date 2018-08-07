import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tab, Tabs } from '@blueprintjs/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Form, Review } from './tabs';
import * as CategoryActions from '../../../../actions/Category';

const validate = Yup.object().shape({
	name: Yup.string()
		.required('Category name is required')
		.trim(),
});

class C extends React.PureComponent<any, any> {
	state = {
		animate: true,
		tabId: 0,
		categories: [],
		name: '',
		parentId: '',
	};

	handleTabChange = (tabId: number) => this.setState({ tabId });

	handleSubmit = async (values: any): Promise<void> => {
		console.log('Form Values: ', values);
		this.props.createCategory(values, () => {
			this.props.history.push('/categories');
		});
	};

	async componentDidMount() {
		const { payload: categories } = await this.props.getCategories();
		this.setState({ categories });
		document.title = 'Categories';
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
		console.log('Categories Props: ', this.props);
		let hideReviewTab = true;
		if (this.state.name.length > 0) {
			hideReviewTab = false;
		}
		const { name, parentId } = this.state;
		console.log('Cat State: ', this.state);
		return (
			<Tabs
				id="categories-form"
				onChange={this.handleTabChange}
				selectedTabId={this.state.tabId}
				animate={true}
				renderActiveTabPanelOnly={true}>
				<Tab
					id={0}
					title="Form"
					panel={
						<Formik
							initialValues={{ name, parentId }}
							onSubmit={this.handleSubmit}
							render={this.renderForm}
							validationSchema={validate}
						/>
					}
				/>
				<Tab
					id={1}
					disabled={hideReviewTab}
					title="Review"
					panel={<Review />}
				/>
				<Tabs.Expander />
			</Tabs>
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
