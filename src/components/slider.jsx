import React from 'react';

import {withSlider} from '../hocs/with-slider';

import {SLIDES} from '../mocks';

const Slider = (props) => {
	console.log(props)
	console.log(SLIDES)
	return (
		<section className="slider">
			<div className="slider__container">
				<ul className="slider__list">
					{SLIDES.map((slide) => {
						return (
							<li key={slide.id} value={slide.id} className={`slider__item ${slide.modificator !== `` ? `slider__item--${slide.modificator}` : ``}`}>
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

			<ul className="slider__identificator" disabled>
				{SLIDES.map((slide) => {
					return (
						<li key={slide.id}>
							<label className="slider__radio slider__radio--checked">
								<input className="visually-hidden" name="slider-radio" type="radio" />
							</label>
						</li>
					);
				})}
			</ul>

		</section>
	);
};

export default withSlider(Slider);
