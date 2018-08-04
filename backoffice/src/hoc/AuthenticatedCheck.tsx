import * as React from 'react';
import { connect } from 'react-redux';

const AuthenticatedCheck = (
	ChildComponent: any,
	requireAuth: boolean = false
) => {
	class ComposedComponent extends React.Component<any, any> {
		checkAuth = () => {
			if (requireAuth) {
				if (!this.props.user.token) {
					this.props.history.push('/login');
				}
			} else {
				if (this.props.user.token) {
					this.props.history.push('/');
				}
			}
		};

		componentDidMount() {
			this.checkAuth();
		}

		componentDidUpdate() {
			this.checkAuth();
		}

		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	const mapStateToProps = (user: object) => user;

	return connect(mapStateToProps)(ComposedComponent);
};

export default AuthenticatedCheck;
