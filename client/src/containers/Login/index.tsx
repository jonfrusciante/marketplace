import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import MainLayout from '../../components/layouts/MainLayout';
import { View } from './view';
import * as LoginActions from '../../actions/User/Login';
import AuthenticatedCheck from '../../hoc/AuthenticatedCheck';

// interface Container {}

interface State {
	email: string;
	password: string;
}

const validate = Yup.object().shape({
	email: Yup.string()
		.email('Please enter a valid email')
		.required('Email is required')
		.lowercase()
		.trim(),
	password: Yup.string().required('Password is required'),
});

class Container extends React.Component<any, any> {
	state: State = {
		email: '',
		password: '',
	};

	constructor(props: any) {
		super(props);
	}

	updateState = (event: any): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	handleLogin = async (
		values: any,
		{ setSubmitting, setErrors, resetForm }: any
	): Promise<void> => {
		this.props.userLogin(values, () => {
			this.props.history.push('/');
		});

		setSubmitting(false);
		resetForm();
		setErrors(this.props.user.message);

		return;
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
		<View
			onChange={handleChange}
			errors={errors}
			values={values}
			touched={touched}
			onBlur={handleBlur}
			loading={isSubmitting}
			isValid={isValid}
			onSubmit={handleSubmit}
		/>
	);

	render() {
		const { email, password } = this.state;
		return (
			<MainLayout>
				<Formik
					initialValues={{ email, password }}
					onSubmit={this.handleLogin}
					render={this.renderForm}
					validationSchema={validate}
				/>
			</MainLayout>
		);
	}
}

const mapStateToProps = (user: any): any => user;

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ ...LoginActions }, dispatch);

const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthenticatedCheck(Container, false));

export { Login };
