import React, {PureComponent} from 'react';

import {extend} from '../util/util';
import {CREDIT_TYPE} from '../const';

export const withCreditCalculator = (Component) => {
	class WithCreditCalculator extends PureComponent {
		constructor(props) {
			super(props);

			this.state = {
				isSelectOpen: false,
				userCredit: {
					type: null,
					propertyValue: null,
				}
			}

			this._onOptionChoseClick = this._onOptionChoseClick.bind(this);
			this.onOpenSelect = this.onOpenSelect.bind(this);
			this.onCloseSelect = this.onCloseSelect.bind(this);
		}

		onOpenSelect(evt) {
			const chosenOption = evt.currentTarget.parentNode.querySelector(`.credit-calculator__option-placeholder`);
			const allOptions = chosenOption.parentNode.querySelectorAll(`.credit-calculator__option`);

			allOptions.forEach((element) => {
				element.style.display = `block`;
				element.addEventListener(`click`, this._onOptionChoseClick);
			})

			this.setState((extend(this.state, {isSelectOpen: true})));
		}

		onCloseSelect(evt) {
			const chosenOption = evt.currentTarget.parentNode.querySelector(`.credit-calculator__option-placeholder`);
			const allOptions = chosenOption.parentNode.querySelectorAll(`.credit-calculator__option`);

			allOptions.forEach((element) => {
				element.style.display = `none`;
				element.removeEventListener(`click`, this._onOptionChoseClick);
			})

			chosenOption.style.display = `block`;
			this.setState((extend(this.state, {isSelectOpen: false})));
		}
		
		_onOptionChoseClick(evt) {
			const chosenOption = evt.currentTarget;

			chosenOption.parentNode.querySelector(`.credit-calculator__option-placeholder`).textContent = chosenOption.textContent;

			console.log(this.state)
			this.setState((extend(this.state, {userCredit: {type: CREDIT_TYPE[chosenOption.value - 1]}})));

			console.log(this.state)

			this.onCloseSelect(evt);

			// const selectedOption = evt.currentTarget;
			// const allOptions = selectedOption.parentNode.querySelectorAll(`.credit-calculator__option`);

			// if (selectedOption.className.indexOf(`placeholder`) > 0 || selectedOption.className.indexOf(`selected`) > 0) {
			// 	console.log(`chose`)
			// 	allOptions.forEach((element) => {
			// 		element.style.display = `none`;
			// 	})
			// 	selectedOption.style.display = `block`;
			// 	selectedOption.style.borderBottom = `none`;
			// 	return;
			// }
			
			// selectedOption.parentNode.querySelectorAll(`.credit-calculator__option`).forEach((element) => {
			// 	element.classList.remove(`credit-calculator__option--selected`)
			// 	element.style.display = `none`;
			// })

			// selectedOption.classList.add(`credit-calculator__option--selected`);
			// selectedOption.parentNode.prepend(selectedOption);
			// selectedOption.style.display = `block`;
			// selectedOption.style.borderBottom = `none`;
			
			// selectedOption.removeEventListener(`click`, this._onOptionChoseClick);
			// selectedOption.addEventListener(`click`, this._onReselectOption);
			// console.log(selectedOption.value, CREDIT_TYPE)
			
			// this.setState((extend(this.state, {userCredit: {type: CREDIT_TYPE[selectedOption.value - 1]}})));
		}

		render() {
			return(
				<Component
					onOpenSelect={this.onOpenSelect}
					onCloseSelect={this.onCloseSelect}
					isSelectOpen={this.state.isSelectOpen}
				/>
			)
		}
	}
	return WithCreditCalculator;
}
