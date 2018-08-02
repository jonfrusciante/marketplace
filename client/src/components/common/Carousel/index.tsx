import * as React from 'react';
import Slider, { Settings } from 'react-slick';

import './style/index.css';

interface Data {
	title: string;
	image: string;
}

interface Props extends Settings {
	data: Data[];
}

class Carousel extends React.PureComponent<Props, any> {
	static defaultProps: Partial<Props> = {
		customPaging: () => <a>--</a>,
		dots: true,
		infinite: true,
		speed: 800,
		slidesToShow: 1,
		lazyLoad: 'ondemand',
		pauseOnHover: true,
		slidesToScroll: 1,
		swipeToSlide: true,
		autoplay: true,
		autoplaySpeed: 1500,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
		// nextArrow: 'next',
		// prevArrow: 'prev',
	};

	renderSlides = (data: Data[]) => {
		return data.map((d: any) => (
			<React.Fragment key={d.title}>
				{/* <h1>{d.title}</h1> */}
				<img src={d.image} alt={d.title} className="img-fluid" />
			</React.Fragment>
		));
	};

	render() {
		return (
			<Slider {...this.props}>
				{this.renderSlides(this.props.data)}
			</Slider>
		);
	}
}

export { Carousel };
