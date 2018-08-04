import * as React from 'react';

import MainLayout from '../../components/layouts/MainLayout';

class NotFound extends React.PureComponent<any, any> {
	render() {
		return (
			<MainLayout>
				<div>
					<h2>Not Found</h2>
					<a href="/">Go back to dashboard</a>
				</div>
			</MainLayout>
		);
	}
}

export { NotFound };
