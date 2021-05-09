import React from 'react';

import {withSlider} from '../hocs/with-slider';
import Identificator from './identificator';

import {SLIDES} from '../mocks';

const Slider = (props) => {
	const {activeSlide, onSwipeStartSlider, sliderWidth} = props;

	return (
		<section className="slider">
			<div className="slider__container">
				<ul className="slider__list" style={{marginLeft: `-${(activeSlide - 1) * 100}vw`}} onTouchStart={onSwipeStartSlider} onMouseDown={onSwipeStartSlider}>
					{SLIDES.map((slide, index) => {
						return (
							<li key={index} className={`slider__item ${slide.modificator !== `` ? `slider__item--${slide.modificator}` : ``}`}>
								<div className={`slider__background ${slide.modificator !== `` ? `slider__background--${slide.modificator}` : ``}`}></div>
								<div className={`slider__block ${slide.modificator !== `` ? `slider__block--${slide.modificator}` : ``}`}>
									<p className={`slider__title ${slide.modificator !== `` ? `slider__title--${slide.modificator}` : ``}`}>{slide.title}</p>
									<h2 className={`slider__text ${slide.modificator !== `` ? `slider__text--${slide.modificator}` : ``}`}>{slide.text}</h2>
									<a className={`slider__button ${slide.modificator !== `` && slide.buttonText !== `` ? `slider__button--${slide.modificator}` : `visually-hidden`}`} href="#top">{slide.buttonText}</a>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<Identificator array={SLIDES} activeElement={activeSlide} />

		</section>
	);
};

export default withSlider(Slider);
