import * as React from 'react';
// import { Card, Elevation } from '@blueprintjs/core';

import { ProductsI } from '../../../../containers/Home';

import '../style/index.css';

const renderCards = (data: ProductsI) =>
	data.map((item: any) => {
		const { title, image, brand, price: p, currency } = item;
		const price = p / 100;
		price.toLocaleString('en-US', { style: 'currency', currency });
		return (
			<div className="product-card" key={title}>
				<a href="#">
					<img src={image} alt={title} />
					<p>
						<span className="product-name">{title}</span> by{' '}
						<strong>{brand}</strong>
					</p>
					<p>
						<strong>${price}</strong>
					</p>
				</a>
			</div>
		);
	});

export default ({ data }: any) => (
	<div className="product-cards">{renderCards(data)}</div>
);
