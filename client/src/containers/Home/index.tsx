import * as React from 'react';

import MainLayout from '../../components/layouts/MainLayout';

import { View } from './view';

class Home extends React.Component<any, any> {
	render() {
		const data = [
			{ title: 'Slide 1', image: 'https://source.unsplash.com/random' },
			{ title: 'Slide 2', image: 'https://source.unsplash.com/random' },
			{ title: 'Slide 3', image: 'https://source.unsplash.com/random' },
			{ title: 'Slide 4', image: 'https://source.unsplash.com/random' },
		];
		return (
			<MainLayout>
				<View data={data} />
			</MainLayout>
		);
	}
}

export { Home };
