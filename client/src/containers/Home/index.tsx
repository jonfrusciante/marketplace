import * as React from 'react';

import MainLayout from '../../components/layouts/MainLayout';
import { Button } from '../../components/common';

class Home extends React.Component<any, any> {
	render() {
		return (
			<MainLayout>
				<h1>Hello World</h1>
				<Button>Hello</Button>
			</MainLayout>
		);
	}
}

export { Home };
