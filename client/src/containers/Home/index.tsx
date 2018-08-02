import * as React from 'react';

import MainLayout from '../../components/layouts/MainLayout';

import { View } from './view';

export interface ProductsI extends Array<any> {
	title: string;
	image: string;
	price: number;
	brand: string;
	link: string;
}

class Home extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
	}

	render() {
		const sliderImages = [
			{
				title: 'Slide 1',
				image: 'https://loremflickr.com/1920/1080/tech',
			},
			{
				title: 'Slide 2',
				image: 'https://loremflickr.com/1920/1080/tech',
			},
			{
				title: 'Slide 3',
				image: 'https://loremflickr.com/1920/1080/tech',
			},
			{
				title: 'Slide 4',
				image: 'https://loremflickr.com/1920/1080/tech',
			},
		];
		const products = [
			{
				title: 'Product 1',
				image: 'https://loremflickr.com/1920/1080/tech',
				price: 18000,
				brand: 'Gap',
				link: '#',
			},
			{
				title: 'Product 2',
				image: 'https://loremflickr.com/1920/1080/tech',
				price: 98000,
				brand: 'Amazon',
				link: '#',
			},
			{
				title: 'Product 3',
				image: 'https://loremflickr.com/1920/1080/tech',
				price: 48000,
				brand: 'Asus',
				link: '#',
			},
			{
				title: 'Product 4',
				image: 'https://loremflickr.com/1920/1080/tech',
				price: 28000,
				brand: 'Walmart',
				link: '#',
			},
		];
		return (
			<MainLayout>
				<View
					sliderImages={sliderImages}
					products={products}
					user={this.props.user}
				/>
			</MainLayout>
		);
	}
}

export { Home };
