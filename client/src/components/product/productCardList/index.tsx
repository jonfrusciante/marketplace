import * as React from 'react';

import View from './view';

const ProductCardList = (props: any) => {
	return (
		<div>
			<View data={props.data} />
		</div>
	);
};

export { ProductCardList };
