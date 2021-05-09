import React, {PureComponent} from "react";

import {SERVICES} from "../mocks";

export const withServices = (Component) => {
	class WithServices extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				activeSlide: 1,
			}

			this.onTabChange = this.onTabChange.bind(this);
			this.onSwipeStartSlider = this.onSwipeStartSlider.bind(this);
			this._onSwipeMoveSlider = this._onSwipeMoveSlider.bind(this);
			this._onSwipeEndSlider = this._onSwipeEndSlider.bind(this);
		}

		onTabChange(evt) {
			console.log(evt)
			// this.sliderWidth = evt.view.innerWidth;
			this.setState({activeSlide: evt.currentTarget.value});
		}

		onSwipeStartSlider(evt) {
			this.sliderWidth = evt.currentTarget.clientWidth;
			console.log(evt)

			if (evt.view.innerWidth >= 1024) {
				return;
			}

			this.slider = evt.currentTarget;
			const evtType = evt.type === `touchstart` ? evt.changedTouches[0] : evt;

			this.swipeLengthStart = evtType.clientX;
			this.swipeStartX = evtType.clientX;
			this.activeSlidePosition = (this.state.activeSlide - 1) * -this.sliderWidth;
			console.log(this.sliderWidth)
			
			document.addEventListener(`touchmove`, this._onSwipeMoveSlider);
			document.addEventListener(`mousemove`, this._onSwipeMoveSlider);
			document.addEventListener(`touchend`, this._onSwipeEndSlider);
			document.addEventListener(`mouseup`, this._onSwipeEndSlider);
		}

		_onSwipeMoveSlider(evt) {
			const evtType = evt.type === `touchmove` ? evt.changedTouches[0] : evt;
			let swipeEndX = evtType.clientX;
			this.differenceX = this.swipeStartX - swipeEndX;

			this.activeSlidePosition += -this.differenceX;
			
			this.slider.style.marginLeft = `${this.activeSlidePosition}px`;

			if (this.activeSlidePosition <= (SERVICES.length - 1) * -this.sliderWidth) {
				this.slider.style.marginLeft = `${(SERVICES.length - 1) * -this.sliderWidth}px`;
			} else if (this.activeSlidePosition >= 0) {
				this.slider.style.marginLeft = `0px`;
			}

			this.swipeStartX = swipeEndX;
		}
		
		_onSwipeEndSlider(evt) {
			document.removeEventListener(`touchmove`, this._onSwipeMoveSlider);
			document.removeEventListener(`mousemove`, this._onSwipeMoveSlider);
			document.removeEventListener(`touchend`, this._onSwipeEndSlider);
			document.removeEventListener(`mouseup`, this._onSwipeEndSlider);

			let activeSlideStartPositionAbsolute = (this.state.activeSlide - 1) * 100;
			let swipeLength = -1 * (this.swipeLengthStart - evt.clientX);

			if (swipeLength <= -this.sliderWidth / 2) {
				this.setState({activeSlide: this.state.activeSlide === SERVICES.length ? 1 : this.state.activeSlide + 1});
				return;
			}
			
			if (swipeLength >= this.sliderWidth / 2) {
				this.setState({activeSlide: this.state.activeSlide === 1 ? SERVICES.length : this.state.activeSlide - 1});
				return;
			}

			this.slider.style.marginLeft = `-${activeSlideStartPositionAbsolute}%`;
		}

		render() {
			return (
				<Component
					onTabChange={this.onTabChange}
					onSwipeStartSlider={this.onSwipeStartSlider}
					sliderWidth={this.sliderWidth}
					activeSlide={this.state.activeSlide}
				/>
			)
		}
	}
	return WithServices;
}
