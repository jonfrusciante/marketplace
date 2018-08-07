import * as React from 'react';

import MainLayout from '../../components/layouts/MainLayout';

class NotFound extends React.PureComponent<any, any> {
	componentDidMount() {
		document.title = '404 - Page not found';
	}

	render() {
		return (
			<MainLayout>
				<h2>Not Found</h2>
				<a href="/">Go back to dashboard</a>
			</MainLayout>
		);
	}
}

export { NotFound };
