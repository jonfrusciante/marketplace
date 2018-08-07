import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import MainLayout from '../../components/layouts/MainLayout';
import * as RegisterActions from '../../actions/User/Register';
import { View } from './view';
import AuthenticatedCheck from '../../hoc/AuthenticatedCheck';

// interface Register {}

interface State {
	name: string;
	email: string;
	passwordConfirmation: string;
	password: string;
}

const validate = Yup.object().shape({
	name: Yup.string()
		.required('Your name is required')
		.trim(),
	email: Yup.string()
		.email('Please enter a valid email')
		.required('Email is required')
		.lowercase()
		.trim(),
	password: Yup.string()
		.required('Password is required')
		.min(6, 'Password must be atleast 6 characters long')
		.max(128, 'Password must be less than 128 characters long')
		.matches(/^[a-z0-9]+$/i, 'Password must include numbers and letters'),
	passwordConfirmation: Yup.string()
		.required('Password confirmation is required')
		.oneOf([Yup.ref('password'), null], 'Password Confirmation must match'),
});

class Container extends React.Component<any, any> {
	state: State = {
		name: '',
		email: '',
		password: '',
		passwordConfirmation: '',
	};

	constructor(props: any) {
		super(props);
	}

	updateState = (event: any): void => {
		const { name, value }: any = event.currentTarget;
		this.setState({ [name]: value });
	};

	handleRegister = async (
		values: any,
		{ setSubmitting, setErrors, resetForm }: any
	): Promise<void> => {
		this.props.userRegister(values, () => {
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
		const { name, email, password, passwordConfirmation } = this.state;
		return (
			<MainLayout>
				<Formik
					initialValues={{
						name,
						email,
						password,
						passwordConfirmation,
					}}
					onSubmit={this.handleRegister}
					render={this.renderForm}
					validationSchema={validate}
				/>
			</MainLayout>
		);
	}
}

const mapStateToProps = (user: any): any => user;

const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators({ ...RegisterActions }, dispatch);

const Register = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthenticatedCheck(Container, false));

export { Register };
