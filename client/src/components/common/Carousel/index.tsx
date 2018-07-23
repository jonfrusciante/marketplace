import * as React from 'react';
import Slider from 'react-slick';

import './style/index.css';

interface Data {
	title: string;
	image: string;
}

interface Props {
	dots?: boolean;
	infinite?: boolean;
	speed?: number;
	slidesToShow?: number;
	slidesToScroll?: number;
	swipeToSlide?: boolean;
	autoplay?: boolean;
	autoplaySpeed?: number;
	data: Data[];
}

class Carousel extends React.PureComponent<Props, any> {
	static defaultProps: Partial<Props> = {
		dots: false,
		infinite: true,
		speed: 600,
		slidesToShow: 1,
		slidesToScroll: 1,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 1500,
	};

	renderData = (data: Data[]) => {
		return data.map((d: any) => (
			<React.Fragment key={d.title}>
				{/* <h1>{d.title}</h1> */}
				<img src={d.image} alt={d.title} className="img-fluid" />
			</React.Fragment>
		));
	};

	render(): JSX.Element {
		return (
			<Slider {...this.props}>{this.renderData(this.props.data)}</Slider>
		);
	}
}

export { Carousel };
