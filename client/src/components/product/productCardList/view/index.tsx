import * as React from 'react';
// import { Card, Elevation } from '@blueprintjs/core';

import { ProductsI } from '../../../../containers/Home';

import '../style/index.css';

const renderCards = (data: ProductsI) =>
	data.map((item: any) => {
		console.log('Item: ', item);
		return (
			<div className="product-card" key={item.title}>
				<a href="#">
					<img src={item.image} alt={item.title} />
					<p>
						{item.title} by <strong>{item.brand}</strong>
					</p>
					<p>
						<strong>${item.price}</strong>
					</p>
				</a>
			</div>
		);
	});

export default ({ data }: any) => (
	<div className="product-cards">{renderCards(data)}</div>
);
