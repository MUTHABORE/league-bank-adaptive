import React, {PureComponent} from "react";

export const withSlider = (Component) => {
	class WithSlider extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				activeSlide: 1,
			}

			this.rotateSlider = this.rotateSlider.bind(this);
		}

		componentDidMount() {
			this.rotateSlider();
		}

		rotateSlider(direction = `right`) {
			const slider = document.querySelector(`.slider__list`);
			const slides = slider.querySelectorAll(`.slider__item`);
			console.log(slides);
			console.log(slides[2].value);

			

			setInterval(() => {
				slider.classList.add(`slider__list--rotate`);
				setTimeout(() => {
					slider.classList.remove(`slider__list--rotate`);
				}, 1000);
			}, 4000);



		}

		render() {
			return (
				<Component
					// rotateSlider={this.rotateSlider}
				/>
			);
		}
	}

	return WithSlider;
}
