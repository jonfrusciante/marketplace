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
				image: 'https://picsum.photos/1920/1080/?random',
			},
			{
				title: 'Slide 2',
				image: 'https://picsum.photos/1920/1080/?random',
			},
			{
				title: 'Slide 3',
				image: 'https://picsum.photos/1920/1080/?random',
			},
			{
				title: 'Slide 4',
				image: 'https://picsum.photos/1920/1080/?random',
			},
		];
		const products = [
			{
				title: 'Product 1',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 18000,
				brand: 'Gap',
				link: '#',
				currency: 'USD',
			},
			{
				title: 'Product 2',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 98030,
				brand: 'Amazon',
				link: '#',
				currency: 'USD',
			},
			{
				title: 'Product 3',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 48055,
				brand: 'Asus',
				link: '#',
				currency: 'USD',
			},
			{
				title: 'Product 4',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 28043,
				brand: 'Walmart',
				link: '#',
				currency: 'USD',
			},
			{
				title: 'Product 5',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 40000,
				brand: 'Google',
				link: '#',
				currency: 'USD',
			},
			{
				title: 'Product 6',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 90000,
				brand: 'City Market',
				link: '#',
				currency: 'USD',
			},
			{
				title: 'Product 7',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 28000,
				brand: 'Super Value',
				link: '#',
				currency: 'USD',
			},
			{
				title: 'Product 8',
				image: 'https://picsum.photos/1920/1080/?random',
				price: 59000,
				brand: 'KMart',
				link: '#',
				currency: 'USD',
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
