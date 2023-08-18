import React, { Component } from 'react';
import Slider from 'react-slick';

export default class SimpleSlider extends Component {
	render() {
		const settings = {
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 4000,
		};
		const sliderItems = [
			'./images/carousel/ai-robot.png',
			'./images/carousel/first_deposit.png',
			'./images/carousel/refer.png',
		];
		return (
			<div className=' bg-gray-900 px-2 w-[95%] mx-auto   py-4'>
				<Slider {...settings}>
					{sliderItems.map((item, index) => (
						<div className={`px-1`} key={index}>
							<img
								src={item}
								alt=''
								className='w-full rounded-xl min-h-[120px]'
							/>
						</div>
					))}
				</Slider>
			</div>
		);
	}
}
