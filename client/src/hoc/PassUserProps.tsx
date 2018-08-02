import * as React from 'react';
import { connect } from 'react-redux';

const PassUserProps = (ChildComponent: any) => {
	class ComposedComponent extends React.Component<any, any> {
		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	const mapStateToProps = (user: object) => user;

	return connect(mapStateToProps)(ComposedComponent);
};

export default PassUserProps;
